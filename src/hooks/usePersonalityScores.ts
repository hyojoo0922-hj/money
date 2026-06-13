/**
 * usePersonalityScores — Phase 3-2
 *
 * Reads personality_scores from Supabase for the current user,
 * then derives the active archetype via archetypeEngine (pure).
 *
 * Falls back to default archetype (답장망상가) when:
 *   - Supabase is not configured
 *   - User is not authenticated
 *   - Scores table is empty
 *   - Any fetch error occurs
 *
 * UI files import only { usePersonalityScores } — never touch score math.
 */

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { resolveArchetype, type ActiveArchetype } from "@/lib/archetypeEngine";
import type { TraitScoreMap } from "@/lib/personalityEngine";

const DEFAULT: ActiveArchetype = {
  key:     "reply_overthinker",
  name_ko: "답장망상가",
  emoji:   "📱",
  margin:  0,
};

interface UsePersonalityScoresResult {
  archetype:  ActiveArchetype;
  scores:     TraitScoreMap;
  loading:    boolean;
}

export function usePersonalityScores(): UsePersonalityScoresResult {
  const [archetype, setArchetype] = useState<ActiveArchetype>(DEFAULT);
  const [scores,    setScores]    = useState<TraitScoreMap>({});
  const [loading,   setLoading]   = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      // Graceful degradation: no Supabase → keep defaults
      if (!supabase) {
        setLoading(false);
        return;
      }

      try {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from("personality_scores")
          .select("trait_key, score")
          .eq("user_id", user.id);

        if (error || !data || data.length === 0) {
          setLoading(false);
          return;
        }

        if (cancelled) return;

        // Build TraitScoreMap from DB rows
        const scoreMap: TraitScoreMap = {};
        for (const row of data) {
          scoreMap[row.trait_key] = row.score;
        }

        // Delegate to pure engine — no math here
        const resolved = resolveArchetype(scoreMap);

        setScores(scoreMap);
        setArchetype(resolved);
      } catch {
        // Non-fatal: default archetype already set
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  return { archetype, scores, loading };
}
