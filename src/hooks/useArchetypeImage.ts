/**
 * useArchetypeImage — Phase 3-3
 *
 * Cache-first hook: checks evolution_generations for a ready image.
 * Falls back to base character PNG if none exists.
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
  /** Image src to render — evolved PNG if ready, base character otherwise */
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

  // ── Load cache + ticket balance on mount ────────────────────────────────
  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!supabase) return;

      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user || cancelled) return;

        // Check cached generation
        const { data: gen } = await supabase
          .from("evolution_generations")
          .select("status, image_url")
          .eq("user_id", user.id)
          .eq("character_id", characterId)
          .eq("archetype_key", archetypeKey)
          .maybeSingle();

        if (!cancelled) {
          if (gen?.status === "ready" && gen.image_url) {
            setSrc(gen.image_url);
            setStatus("ready");
          } else if (gen?.status === "pending") {
            setStatus("pending");
          } else if (gen?.status === "failed") {
            setStatus("failed");
          }
        }

        // Check ticket balance
        const { data: profile } = await supabase
          .from("profiles")
          .select("evolution_tickets")
          .eq("user_id", user.id)
          .maybeSingle();

        if (!cancelled && profile) {
          setTicketsRemaining(profile.evolution_tickets ?? 0);
          if ((profile.evolution_tickets ?? 0) < 1 && gen?.status !== "ready") {
            setStatus("no_tickets");
          }
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
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("not_authenticated");

      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-archetype-image`,
        {
          method:  "POST",
          headers: {
            "Content-Type":  "application/json",
            "Authorization": `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ character_id: characterId, archetype_key: archetypeKey }),
        },
      );

      const data = await res.json();

      if (res.status === 200 && data.image_url) {
        setSrc(data.image_url);
        setStatus("ready");
        setTicketsRemaining((prev) => Math.max(0, prev - 1));
      } else if (res.status === 202) {
        setStatus("pending");
      } else if (res.status === 403) {
        setStatus("no_tickets");
        setTicketsRemaining(0);
      } else {
        // generation_failed — ticket NOT deducted
        setStatus("failed");
        setErrorMessage("생성에 실패했어. 티켓은 차감되지 않았어.");
      }
    } catch {
      setStatus("failed");
      setErrorMessage("연결이 끊겼어. 잠시 후 다시 시도해봐.");
    }
  }

  return { src, status, ticketsRemaining, triggerGeneration, errorMessage };
}
