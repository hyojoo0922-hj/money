/**
 * MINGLEY Personality Engine — Phase 3-1
 *
 * ALL score math lives here. UI and persistence layers never contain
 * score logic. Future archetype model swaps only touch this file.
 *
 * Sources:
 *   03_PERSONALITY_ENGINE.md — trait update rules, weight types, clamping
 *   08_DATABASE_SCHEMA.md    — trait_effects JSONB format
 */

// ── Types ──────────────────────────────────────────────────────────────────

/** Raw trait_effects map stored on a question_option. */
export type TraitEffects = Record<string, number>;

/** Per-trait score map for a user (trait_key → score 0–100). */
export type TraitScoreMap = Record<string, number>;

/** Question weight type as defined in the schema. */
export type WeightType =
  | "light"
  | "behavior"
  | "life_philosophy"
  | "core_relationship";

/** One trait's change record — written to personality_score_logs. */
export interface TraitDelta {
  trait_key:      string;
  previous_score: number;
  new_score:      number;
  delta:          number;
}

/** Full result of applying one answer to the current score state. */
export interface EngineResult {
  /** Updated scores — only affected traits are included. */
  updatedScores: TraitScoreMap;
  /** Every change that was applied — used for DB logging. */
  deltas: TraitDelta[];
}

// ── Constants ──────────────────────────────────────────────────────────────

const SCORE_MIN = 0;
const SCORE_MAX = 100;

/**
 * Weight multipliers per question type.
 * Source: 03_PERSONALITY_ENGINE.md — "Question weights"
 */
const WEIGHT_MULTIPLIERS: Record<WeightType, number> = {
  light:             0.5,
  behavior:          1.0,
  life_philosophy:   1.5,
  core_relationship: 1.75,
};

// ── Pure helpers ───────────────────────────────────────────────────────────

function clamp(value: number): number {
  return Math.max(SCORE_MIN, Math.min(SCORE_MAX, value));
}

function round1(value: number): number {
  return Math.round(value * 10) / 10;
}

// ── Core engine function ───────────────────────────────────────────────────

/**
 * Apply one answer's trait_effects to the current score state.
 *
 * @param currentScores  Live trait scores for the user.
 *                       Traits not present default to 50 (neutral start).
 * @param traitEffects   The option's trait_effects JSONB (raw deltas).
 * @param weightType     The question's weight_type — scales all deltas.
 * @returns              Updated scores (affected traits only) + delta log entries.
 *
 * Pure function — no side effects, no DB calls.
 */
export function applyTraitEffects(
  currentScores: TraitScoreMap,
  traitEffects:  TraitEffects,
  weightType:    WeightType,
): EngineResult {
  const multiplier = WEIGHT_MULTIPLIERS[weightType];
  const updatedScores: TraitScoreMap = {};
  const deltas: TraitDelta[] = [];

  for (const [trait_key, rawDelta] of Object.entries(traitEffects)) {
    const previous_score = currentScores[trait_key] ?? 50;
    const scaledDelta    = rawDelta * multiplier;
    const new_score      = round1(clamp(previous_score + scaledDelta));
    const delta          = round1(new_score - previous_score);

    if (delta !== 0) {
      updatedScores[trait_key] = new_score;
      deltas.push({ trait_key, previous_score, new_score, delta });
    }
  }

  return { updatedScores, deltas };
}

/**
 * Merge a partial score update into an existing score map.
 * Returns a new object — does not mutate the input.
 */
export function mergeScores(
  existing: TraitScoreMap,
  updates:  TraitScoreMap,
): TraitScoreMap {
  return { ...existing, ...updates };
}

/**
 * Compute category-level average for a set of traits.
 * Used by the archetype engine in Phase 3-2.
 */
export function categoryAverage(
  scores:    TraitScoreMap,
  traitKeys: string[],
): number {
  if (traitKeys.length === 0) return 0;
  const total = traitKeys.reduce(
    (sum, key) => sum + (scores[key] ?? 50),
    0,
  );
  return round1(total / traitKeys.length);
}
