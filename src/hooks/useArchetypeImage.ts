/**
 * useArchetypeImage — Phase 3-3
 *
 * Cache-first hook: resolves the user's persisted profiles.character_id, then
 * loads the most recent ready evolution_generations image for that character.
 * Falls back to the base character PNG if none exists.
 * Exposes triggerGeneration() for the Profile screen CTA.
 *
 * Does NOT poll or use realtime (MVP scope).
 * Updated image appears on next app load after generation completes.
 */

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { CHARACTERS, type CharacterId } from "@/lib/assets";

export type GenerationStatus = "idle" | "pending" | "ready" | "failed" | "no_tickets";

interface UseArchetypeImageResult {
  src:               string;
  status:            GenerationStatus;
  ticketsRemaining:  number;
  triggerGeneration: () => Promise<void>;
  errorMessage:      string | null;
}

export function useArchetypeImage(
  characterId: CharacterId,
  archetypeKey: string,
): UseArchetypeImageResult {
  const baseSrc = CHARACTERS[characterId].src;

  const [src,              setSrc]              = useState<string>(baseSrc);
  const [status,           setStatus]           = useState<GenerationStatus>("idle");
  const [ticketsRemaining, setTicketsRemaining] = useState<number>(0);
  const [errorMessage,     setErrorMessage]     = useState<string | null>(null);
  // Persisted base character (resolved from profiles.character_id on mount).
  // Falls back to the passed characterId until/unless Supabase resolves.
  const [activeCharacterId, setActiveCharacterId] = useState<CharacterId>(characterId);

  // ── Resolve persisted character + latest ready image on mount ─────────
  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!supabase) return; // no backend — stay on base character (fallback param)

      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user || cancelled) return;

        // 1. Persisted base character (fallback to passed id) + ticket balance
        const { data: profile } = await supabase
          .from("profiles")
          .select("character_id, evolution_tickets")
          .eq("user_id", user.id)
          .maybeSingle();

        const persisted = profile?.character_id;
        const effectiveId: CharacterId =
          persisted && Object.prototype.hasOwnProperty.call(CHARACTERS, persisted)
            ? (persisted as CharacterId)
            : characterId;

        if (cancelled) return;
        setActiveCharacterId(effectiveId);
        setSrc(CHARACTERS[effectiveId]?.src ?? baseSrc);

        // 2. CTA status for the current (character, archetype)
        const { data: gen } = await supabase
          .from("evolution_generations")
          .select("status")
          .eq("user_id", user.id)
          .eq("character_id", effectiveId)
          .eq("archetype_key", archetypeKey)
          .maybeSingle();

        // 3. Active evolved image: most recent ready row for (user, character)
        const { data: latest } = await supabase
          .from("evolution_generations")
          .select("image_url")
          .eq("user_id", user.id)
          .eq("character_id", effectiveId)
          .eq("status", "ready")
          .order("generated_at", { ascending: false })
          .limit(1)
          .maybeSingle();

        if (cancelled) return;

        if (latest?.image_url) setSrc(latest.image_url);

        // 4. Resolve display status (a ready image wins; else CTA state)
        const tickets = profile?.evolution_tickets ?? 0;
        setTicketsRemaining(tickets);

        if (latest?.image_url) {
          setStatus("ready");
        } else if (gen?.status === "pending") {
          setStatus("pending");
        } else if (gen?.status === "failed") {
          setStatus("failed");
        } else if (tickets < 1) {
          setStatus("no_tickets");
        }
      } catch {
        // Supabase unavailable — stay on base character
      }
    }

    load();
    return () => { cancelled = true; };
  }, [characterId, archetypeKey]);

  // ── Trigger generation ────────────────────────────────────────────────
  async function triggerGeneration() {
    if (!supabase) return;
    if (status === "pending" || status === "ready") return;

    setStatus("pending");
    setErrorMessage(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("not_authenticated");

      const { data, error } = await supabase.functions.invoke(
        "generate-archetype-image",
        {
          body: {
            user_id:       user.id,
            character_id:  activeCharacterId,
            archetype_key: archetypeKey,
          },
        },
      );

      if (error) {
        const httpStatus = (error as any)?.context?.status ?? 0;
        if (httpStatus === 403) {
          setStatus("no_tickets");
          setTicketsRemaining(0);
          return;
        }
        if (httpStatus === 202) {
          setStatus("pending");
          return;
        }
        try {
          const body = await (error as any).context?.json?.();
          console.error("[useArchetypeImage] generation error:", httpStatus, body);
        } catch {
          console.error("[useArchetypeImage] generation error:", httpStatus, error);
        }
        throw error;
      }

      if (data?.status === "ready" && data?.image_url) {
        setSrc(data.image_url);
        setStatus("ready");
        setTicketsRemaining((prev) => Math.max(0, prev - 1));
        return;
      }

      if (data?.status === "pending") {
        setStatus("pending");
        return;
      }

      throw new Error(data?.error ?? "unexpected_response");

    } catch {
      setStatus("failed");
      setErrorMessage("생성에 실패했어. 티켓은 차감되지 않았어.");
    }
  }

  return { src, status, ticketsRemaining, triggerGeneration, errorMessage };
}

