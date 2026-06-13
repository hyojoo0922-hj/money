/**
 * MINGLEY Archetype Engine — Phase 3-2 MVP
 *
 * Pure function: TraitScoreMap → ActiveArchetype
 * No side effects. No DB calls. No AI.
 *
 * Phase 3-3 will expand to 200 archetypes by replacing MVP_ARCHETYPES.
 * No screen files will need to change.
 *
 * Sources:
 *   04_HUMAN_ARCHETYPE_LIBRARY.md — archetype rules, update frequency
 *   03_PERSONALITY_ENGINE.md      — category average calculation
 */

import { categoryAverage, type TraitScoreMap } from "./personalityEngine";

// ── Types ──────────────────────────────────────────────────────────────────

export interface ArchetypeRule {
  key:          string;
  name_ko:      string;
  emoji:        string;
  /** Trait key that must meet primary_min */
  primary_trait: string;
  primary_min:   number;
  /** Category whose average must meet category_min */
  category_key:  string;
  category_min:  number;
  /** Lower = higher priority when margin is tied */
  priority:      number;
}

export interface ActiveArchetype {
  key:     string;
  name_ko: string;
  emoji:   string;
  /** How far above the threshold the winning trait scored */
  margin:  number;
}

// ── Trait keys per category (subset used for MVP) ─────────────────────────
// Phase 3-3: import full category map from traits.ts

const CATEGORY_TRAITS: Record<string, string[]> = {
  anxiety: [
    "anxiety_reply_sensitivity",
    "anxiety_overthinking",
    "anxiety_future_worry",
    "anxiety_rejection_fear",
    "anxiety_meaning_reading",
    "anxiety_scenario_simulation",
    "anxiety_uncertainty_discomfort",
    "anxiety_validation_need",
    "anxiety_social_radar",
    "anxiety_emotional_forecasting",
  ],
  strategy: [
    "strategy_planning",
    "strategy_efficiency",
    "strategy_analysis",
    "strategy_foresight",
    "strategy_organization",
    "strategy_risk_management",
    "strategy_prioritization",
    "strategy_data_driven",
    "strategy_optimization",
    "strategy_conclusion_first",
  ],
  emotion: [
    "emotion_intensity",
    "emotion_expression",
    "emotion_volatility",
    "emotion_sentimentality",
    "emotion_passion",
    "emotion_nostalgia",
    "emotion_romanticism",
    "emotion_melancholy",
    "emotion_empathic_overflow",
    "emotion_mood_awareness",
  ],
};

// ── MVP archetypes (4) ────────────────────────────────────────────────────

const MVP_ARCHETYPES: ArchetypeRule[] = [
  {
    key:           "reply_overthinker",
    name_ko:       "답장망상가",
    emoji:         "📱",
    primary_trait: "anxiety_reply_sensitivity",
    primary_min:   65,
    category_key:  "anxiety",
    category_min:  60,
    priority:      1,
  },
  {
    key:           "human_excel",
    name_ko:       "인간엑셀",
    emoji:         "📊",
    primary_trait: "strategy_planning",
    primary_min:   65,
    category_key:  "strategy",
    category_min:  60,
    priority:      2,
  },
  {
    key:           "emotion_locomotive",
    name_ko:       "감정폭주기관차",
    emoji:         "🚂",
    primary_trait: "emotion_intensity",
    primary_min:   65,
    category_key:  "emotion",
    category_min:  60,
    priority:      3,
  },
  {
    key:           "relationship_weather_caster",
    name_ko:       "관계기상캐스터",
    emoji:         "🌦️",
    primary_trait: "anxiety_emotional_forecasting",
    primary_min:   62,
    category_key:  "anxiety",
    category_min:  58,
    priority:      4,
  },
];

const DEFAULT_ARCHETYPE: ActiveArchetype = {
  key:     "reply_overthinker",
  name_ko: "답장망상가",
  emoji:   "📱",
  margin:  0,
};

// ── Core engine function ──────────────────────────────────────────────────

/**
 * Evaluate personality scores against MVP archetype rules.
 *
 * @param scores  Current trait score map (trait_key → 0–100).
 *                Empty map or missing traits default to 50.
 * @returns       The best-matching archetype, or the default if none qualify.
 *
 * Pure function — no side effects.
 */
export function resolveArchetype(scores: TraitScoreMap): ActiveArchetype {
  const candidates: { rule: ArchetypeRule; margin: number }[] = [];

  for (const rule of MVP_ARCHETYPES) {
    const traitScore = scores[rule.primary_trait] ?? 50;
    if (traitScore < rule.primary_min) continue;

    const catTraits = CATEGORY_TRAITS[rule.category_key] ?? [];
    const catAvg    = categoryAverage(scores, catTraits);
    if (catAvg < rule.category_min) continue;

    const margin = traitScore - rule.primary_min;
    candidates.push({ rule, margin });
  }

  if (candidates.length === 0) return DEFAULT_ARCHETYPE;

  // Sort: highest margin first; break ties by priority (lower = better)
  candidates.sort((a, b) =>
    b.margin !== a.margin
      ? b.margin - a.margin
      : a.rule.priority - b.rule.priority,
  );

  const winner = candidates[0];
  return {
    key:     winner.rule.key,
    name_ko: winner.rule.name_ko,
    emoji:   winner.rule.emoji,
    margin:  winner.margin,
  };
}
