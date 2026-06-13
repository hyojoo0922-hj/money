import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import OpenAI from "https://esm.sh/openai@4";
import { ARCHETYPE_VISUAL_RULES, buildArchetypePrompt } from "./archetypeVisualRules.ts";

const corsHeaders = {
 "Access-Control-Allow-Origin": "*",
 "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
 if (req.method === "OPTIONS") {
   return new Response("ok", { status: 200, headers: corsHeaders });
 }

 const supabaseUrl    = Deno.env.get("SUPABASE_URL");
 const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
 const anonKey        = Deno.env.get("SUPABASE_ANON_KEY");
 const openaiKey      = Deno.env.get("OPENAI_API_KEY");

 if (!supabaseUrl || !serviceRoleKey || !anonKey || !openaiKey) {
   return new Response(
     JSON.stringify({ error: "missing_env" }),
     { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
   );
 }

 const supabase = createClient(supabaseUrl, serviceRoleKey);
 const openai   = new OpenAI({ apiKey: openaiKey });

 const authHeader = req.headers.get("Authorization");
 if (!authHeader) {
   return new Response(
     JSON.stringify({ error: "unauthorized" }),
     { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } },
   );
 }

 const anonClient = createClient(supabaseUrl, anonKey, {
   global: { headers: { Authorization: authHeader } },
 });

 const { data: { user }, error: authError } = await anonClient.auth.getUser();
 if (authError || !user) {
   return new Response(
     JSON.stringify({ error: "unauthorized" }),
     { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } },
   );
 }

 let body: { character_id?: string; archetype_key?: string };
 try {
   body = await req.json();
 } catch {
   return new Response(
     JSON.stringify({ error: "invalid_body" }),
     { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
   );
 }

 const { character_id, archetype_key } = body;
 if (!character_id || !archetype_key) {
   return new Response(
     JSON.stringify({ error: "missing_fields" }),
     { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
   );
 }

 const visualRule = ARCHETYPE_VISUAL_RULES[archetype_key];
 if (!visualRule) {
   return new Response(
     JSON.stringify({ error: "unknown_archetype" }),
     { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
   );
 }

 const { data: existing } = await supabase
   .from("evolution_generations")
   .select("id, status, image_url")
   .eq("user_id", user.id)
   .eq("character_id", character_id)
   .eq("archetype_key", archetype_key)
   .maybeSingle();

 if (existing?.status === "ready") {
   return new Response(
     JSON.stringify({ status: "ready", image_url: existing.image_url }),
     { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
   );
 }

 if (existing?.status === "pending") {
   return new Response(
     JSON.stringify({ status: "pending" }),
     { status: 202, headers: { ...corsHeaders, "Content-Type": "application/json" } },
   );
 }

 const { data: profile, error: profileError } = await supabase
   .from("profiles")
   .select("evolution_tickets, level, total_tickets_used")
   .eq("user_id", user.id)
   .single();

 if (profileError || !profile) {
   return new Response(
     JSON.stringify({ error: "profile_not_found" }),
     { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } },
   );
 }

 if (profile.evolution_tickets < 1) {
   return new Response(
     JSON.stringify({ error: "no_tickets" }),
     { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } },
   );
 }

 const genId = crypto.randomUUID();

 const { error: reserveError } = await supabase
   .from("evolution_generations")
   .upsert(
     {
       id:                  existing ? existing.id : genId,
       user_id:             user.id,
       character_id:        character_id,
       archetype_key:       archetype_key,
       status:              "pending",
       generation_type:     "free_ticket",
       ticket_reserved:     true,
       ticket_consumed:     false,
       level_at_generation: profile.level,
       prompt_version:      visualRule.prompt_version,
       image_url:           null,
     },
     { onConflict: "user_id,character_id,archetype_key" },
   );

 if (reserveError) {
   return new Response(
     JSON.stringify({ error: "reserve_failed" }),
     { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
   );
 }

 let imageUrl: string;

 try {
   const prompt = buildArchetypePrompt(visualRule, character_id);
   console.log("STEP 1 prompt length:", prompt.length, "archetype:", archetype_key);

   console.log("STEP 2 calling OpenAI images.generate");
   const response = await openai.images.generate({
     model:  "gpt-image-1",
     prompt: prompt,
     size:   "1024x1536",
     n:      1,
   });
   console.log("STEP 2 response data length:", response.data?.length);

   const imageData = response.data?.[0];
   if (!imageData) throw new Error("no_image_returned");
   console.log("STEP 2 imageData keys:", Object.keys(imageData).join(","));

   let uploadBytes: Uint8Array;
   if (imageData.b64_json) {
     console.log("STEP 3 decoding b64_json length:", imageData.b64_json.length);
     const binary = atob(imageData.b64_json);
     uploadBytes  = new Uint8Array(binary.length);
     for (let i = 0; i < binary.length; i++) {
       uploadBytes[i] = binary.charCodeAt(i);
     }
   } else if (imageData.url) {
     console.log("STEP 3 fetching image url:", imageData.url.substring(0, 60));
     const imgRes = await fetch(imageData.url);
     uploadBytes  = new Uint8Array(await imgRes.arrayBuffer());
   } else {
     throw new Error("no_image_data");
   }
   console.log("STEP 3 upload bytes size:", uploadBytes.length);

   const storagePath = `${user.id}/${character_id}_${archetype_key}.png`;
   console.log("STEP 4 uploading to archetype-images:", storagePath);
   const { error: uploadError } = await supabase.storage
     .from("archetype-images")
     .upload(storagePath, uploadBytes, { contentType: "image/png", upsert: true });

   if (uploadError) throw new Error(`storage_upload_failed: ${uploadError.message}`);
   console.log("STEP 4 upload success");

   const { data: publicUrlData } = supabase.storage
     .from("archetype-images")
     .getPublicUrl(storagePath);

   imageUrl = publicUrlData.publicUrl;
   console.log("STEP 5 public url:", imageUrl.substring(0, 80));

 } catch (genError) {
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

   const errMsg = genError instanceof Error
     ? `${genError.message}\n${genError.stack ?? ""}`
     : String(genError);
   console.error("GENERATION FAILED:", errMsg);

   return new Response(
     JSON.stringify({ error: "generation_failed", detail: errMsg, ticket_refunded: true }),
     { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
   );
 }

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

 const newBalance = profile.evolution_tickets - 1;

 await supabase
   .from("profiles")
   .update({
     evolution_tickets:  newBalance,
     total_tickets_used: profile.total_tickets_used + 1,
   })
   .eq("user_id", user.id);

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
