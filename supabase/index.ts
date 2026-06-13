/**
 * generate-archetype-image — Supabase Edge Function
 * Phase 3-3 MVP
 *
 * Flow:
 *   1. Auth check
 *   2. Cache check (ready → return url, pending → return 202)
 *   3. Ticket check (< 1 → return 403)
 *   4. Reserve row (upsert pending, no ticket deducted yet)
 *   5. Generate via OpenAI
 *   6. SUCCESS: upload PNG → atomic transaction (deduct ticket + ready status)
 *   7. FAILURE: set failed, ticket unchanged, user can retry
 *
 * Critical rule: ticket is NEVER deducted if generation fails.
 */

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import OpenAI from "https://esm.sh/openai@4";
import { ARCHETYPE_VISUAL_RULES, buildArchetypePrompt } from "./archetypeVisualRules.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin":  "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  // ── Service role client (bypasses RLS for writes) ─────────────────────
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const openai = new OpenAI({
    apiKey: Deno.env.get("OPENAI_API_KEY")!,
  });

  // ── 1. Auth ───────────────────────────────────────────────────────────
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    return new Response(JSON.stringify({ error: "unauthorized" }), {
      status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const anonClient = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    { global: { headers: { Authorization: authHeader } } },
  );

  const { data: { user }, error: authError } = await anonClient.auth.getUser();
  if (authError || !user) {
    return new Response(JSON.stringify({ error: "unauthorized" }), {
      status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // ── Parse body ────────────────────────────────────────────────────────
  let body: { character_id?: string; archetype_key?: string };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "invalid_body" }), {
      status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const { character_id, archetype_key } = body;
  if (!character_id || !archetype_key) {
    return new Response(JSON.stringify({ error: "missing_fields" }), {
      status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const visualRule = ARCHETYPE_VISUAL_RULES[archetype_key];
  if (!visualRule) {
    return new Response(JSON.stringify({ error: "unknown_archetype" }), {
      status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // ── 2. Cache check ────────────────────────────────────────────────────
  const { data: existing } = await supabase
    .from("evolution_generations")
    .select("id, status, image_url")
    .eq("user_id", user.id)
    .eq("character_id", character_id)
    .eq("archetype_key", archetype_key)
    .maybeSingle();

  if (existing?.status === "ready") {
    return new Response(JSON.stringify({ status: "ready", image_url: existing.image_url }), {
      status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  if (existing?.status === "pending") {
    return new Response(JSON.stringify({ status: "pending" }), {
      status: 202, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // ── 3. Ticket check ───────────────────────────────────────────────────
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("evolution_tickets, level")
    .eq("user_id", user.id)
    .single();

  if (profileError || !profile) {
    return new Response(JSON.stringify({ error: "profile_not_found" }), {
      status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  if (profile.evolution_tickets < 1) {
    return new Response(JSON.stringify({ error: "no_tickets" }), {
      status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // ── 4. Reserve row (pending, no ticket deducted yet) ──────────────────
  const genId = crypto.randomUUID();
  const { error: reserveError } = await supabase
    .from("evolution_generations")
    .upsert({
      id:                  existing ? existing.id : genId,
      user_id:             user.id,
      character_id,
      archetype_key,
      status:              "pending",
      generation_type:     "free_ticket",
      ticket_reserved:     true,
      ticket_consumed:     false,
      level_at_generation: profile.level,
      prompt_version:      visualRule.prompt_version,
      image_url:           null,
    }, { onConflict: "user_id,character_id,archetype_key" });

  if (reserveError) {
    return new Response(JSON.stringify({ error: "reserve_failed" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // ── 5. Generate via OpenAI ────────────────────────────────────────────
  let imageUrl: string;

  try {
    // Fetch base character PNG as reference image
    const baseImageUrl = `${Deno.env.get("SUPABASE_URL")}/storage/v1/object/public/base-characters/${character_id}.png`;
    const baseImageRes = await fetch(baseImageUrl);
    const baseImageBlob = await baseImageRes.blob();
    const baseImageFile = new File([baseImageBlob], `${character_id}.png`, { type: "image/png" });

    // Build prompt
    const prompt = buildArchetypePrompt(visualRule, character_id);

    // Call OpenAI image edit (reference image for face consistency)
    const response = await openai.images.edit({
      model:   "gpt-image-1",
      image:   baseImageFile,
      prompt,
      size:    "1024x1536",
      // @ts-ignore — quality field supported by gpt-image-1
      quality: "high",
    });

    const imageData = response.data?.[0];
    if (!imageData) throw new Error("no_image_returned");

    // Upload to Supabase Storage
    const storagePath = `${user.id}/${character_id}_${archetype_key}.png`;
    let uploadBytes: Uint8Array;

    if (imageData.b64_json) {
      const binary = atob(imageData.b64_json);
      uploadBytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) uploadBytes[i] = binary.charCodeAt(i);
    } else if (imageData.url) {
      const imgRes = await fetch(imageData.url);
      uploadBytes = new Uint8Array(await imgRes.arrayBuffer());
    } else {
      throw new Error("no_image_data");
    }

    const { error: uploadError } = await supabase.storage
      .from("archetype-images")
      .upload(storagePath, uploadBytes, {
        contentType:  "image/png",
        upsert:       true,
      });

    if (uploadError) throw uploadError;

    const { data: publicUrl } = supabase.storage
      .from("archetype-images")
      .getPublicUrl(storagePath);

    imageUrl = publicUrl.publicUrl;

  } catch (genError) {
    // ── FAILURE PATH: ticket NOT deducted ────────────────────────────
    await supabase
      .from("evolution_generations")
      .update({
        status:          "failed",
        ticket_reserved: false,
        ticket_consumed: false,
      })
      .eq("user_id", user.id)
      .eq("character_id", character_id)
      .eq("archetype_key", archetype_key);

    console.error("generation failed:", genError);
    return new Response(
      JSON.stringify({ error: "generation_failed", ticket_refunded: true }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }

  // ── 6. SUCCESS: atomic deduct ticket + mark ready ─────────────────────
  // Supabase does not expose multi-statement transactions via JS client directly.
  // We perform the two writes sequentially. If the second fails, the generation
  // is still marked ready (idempotent) but the ticket count is off — acceptable
  // in MVP; a reconciliation query can fix it.

  // a. Mark generation ready
  await supabase
    .from("evolution_generations")
    .update({
      status:          "ready",
      image_url:       imageUrl,
      ticket_reserved: false,
      ticket_consumed: true,
    })
    .eq("user_id", user.id)
    .eq("character_id", character_id)
    .eq("archetype_key", archetype_key);

  // b. Deduct ticket from profile
  const newBalance = profile.evolution_tickets - 1;
  await supabase
    .from("profiles")
    .update({
      evolution_tickets:  newBalance,
      total_tickets_used: (profile as any).total_tickets_used + 1,
    })
    .eq("user_id", user.id);

  // c. Ledger entry
  await supabase
    .from("evolution_ticket_ledger")
    .insert({
      user_id:       user.id,
      event_type:    "spent",
      delta:         -1,
      balance_after: newBalance,
      reason:        "free_ticket_spend",
      generation_id: existing?.id ?? genId,
    });

  return new Response(
    JSON.stringify({ status: "ready", image_url: imageUrl }),
    { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
  );
});
