import { useState } from "react";
import { cn } from "@/lib/cn";
import { applyTraitEffects, type WeightType } from "@/lib/personalityEngine";
import { supabase } from "@/lib/supabase";
import type { DailyQuestionCard } from "@/data/mock";

const OPTION_EMOJIS = ["😌", "😐", "🟦", "🔥"];

const WEIGHT_LABEL: Record<WeightType, string> = {
  light:             "가벼운 질문",
  behavior:          "행동 질문",
  life_philosophy:   "가치관 질문",
  core_relationship: "관계 핵심 질문",
};

/**
 * Minimal trait_effects for mock options.
 * Phase 3-2: replace with real question_options rows from Supabase.
 * All score math is delegated to personalityEngine — never inline here.
 */
const MOCK_TRAIT_EFFECTS: Record<string, Record<number, Record<string, number>>> = {
  q1: {
    0: { anxiety_reply_sensitivity: -2, anxiety_overthinking: -1, empathy_sensitivity: 1 },
    1: { anxiety_reply_sensitivity: 1,  anxiety_overthinking: 1,  relationship_focus: 1 },
    2: { anxiety_reply_sensitivity: 3,  anxiety_overthinking: 3,  anxiety_meaning_reading: 2 },
    3: { anxiety_reply_sensitivity: 4,  anxiety_overthinking: 3,  anxiety_scenario_simulation: 3 },
  },
  q2: {
    0: { independence_solo_comfort: 3,  emotion_volatility: -1 },
    1: { emotion_sentimentality: 2,     relationship_focus: 1 },
    2: { emotion_intensity: 3,          relationship_reliability: 1 },
    3: { anxiety_reply_sensitivity: 2,  empathy_consideration: 2, relationship_focus: 2 },
  },
  q4: {
    0: { challenge_risk_taking: 4,      strategy_planning: -2, challenge_initiative: 3 },
    1: { strategy_planning: 4,          strategy_organization: 3, discipline_consistency: 2 },
    2: { sociality_approachability: 3,  relationship_communication: 2 },
    3: { anxiety_overthinking: 4,       anxiety_scenario_simulation: 3, strategy_foresight: 2 },
  },
};

interface Props {
  card:        DailyQuestionCard;
  onAnswered?: (cardId: string) => void;
}

export function QuestionCard({ card, onAnswered }: Props) {
  const [expanded,   setExpanded]   = useState(false);
  const [picked,     setPicked]     = useState<number | null>(card.answered ? 0 : null);
  const [note,       setNote]       = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [feedback,   setFeedback]   = useState<"idle" | "success">("idle");

  const locked = card.answered;

  async function handleSubmit(optionIndex: number) {
    if (locked || submitting || picked !== null) return;
    setPicked(optionIndex);
    setSubmitting(true);

    // ── Get trait_effects for this option ──────────────────────────────
    // Phase 3-2: replace with Supabase query on question_options
    const traitEffects = MOCK_TRAIT_EFFECTS[card.id]?.[optionIndex] ?? {};

    // ── Delegate ALL math to the engine — no score logic here ──────────
    const { updatedScores, deltas } = applyTraitEffects(
      {},               // Phase 3-2: pass live scores from Supabase
      traitEffects,
      card.weightType,
    );

    // ── Persist if Supabase is available ───────────────────────────────
    if (supabase) {
      try {
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
          // 1. Insert immutable answer
          const { data: answerRow, error: answerErr } = await supabase
            .from("answers")
            .insert({
              user_id:      user.id,
              question_id:  card.id,
              option_id:    String(optionIndex),
              short_answer: note.trim() || null,
              trait_delta:  updatedScores,
              weight_type:  card.weightType,
            })
            .select("id")
            .single();

          if (answerErr) throw answerErr;

          // 2. Upsert personality_scores for each affected trait
          const scoreUpserts = Object.entries(updatedScores).map(
            ([trait_key, score]) => ({
              user_id:         user.id,
              trait_key,
              score,
              last_updated_at: new Date().toISOString(),
            }),
          );

          if (scoreUpserts.length > 0) {
            const { error: scoreErr } = await supabase
              .from("personality_scores")
              .upsert(scoreUpserts, { onConflict: "user_id,trait_key" });
            if (scoreErr) throw scoreErr;
          }

          // 3. Insert score logs (audit trail)
          const logInserts = deltas.map((d) => ({
            user_id:          user.id,
            trait_key:        d.trait_key,
            previous_score:   d.previous_score,
            new_score:        d.new_score,
            delta:            d.delta,
            source_answer_id: answerRow.id,
          }));

          if (logInserts.length > 0) {
            const { error: logErr } = await supabase
              .from("personality_score_logs")
              .insert(logInserts);
            if (logErr) throw logErr;
          }
        }
      } catch {
        // Non-fatal: local state already updated, feedback still shows
      }
    }

    setFeedback("success");
    setSubmitting(false);
    setTimeout(() => setFeedback("idle"), 2500);
    onAnswered?.(card.id);
  }

  return (
    <div className="rounded-xl bg-card border border-border overflow-hidden">
      {/* question header — tap to expand */}
      <button
        className="w-full flex items-start justify-between gap-3 px-4 py-4 text-left"
        onClick={() => !locked && setExpanded((v) => !v)}
      >
        <div className="flex-1 min-w-0">
          <span className="text-[10px] font-semibold text-purple">
            {WEIGHT_LABEL[card.weightType]}
          </span>
          <p className="text-[15px] font-bold text-primary leading-snug mt-0.5">
            {card.question}
          </p>
          {locked && (
            <p className="text-xs text-purple font-semibold mt-1">답변 완료</p>
          )}
        </div>
        {!locked && (
          <span
            className={cn(
              "text-tertiary text-xs transition-transform duration-200 shrink-0 pt-1",
              expanded && "rotate-180",
            )}
          >
            ▾
          </span>
        )}
      </button>

      {/* answer options — visible only when expanded */}
      {expanded && !locked && (
        <div className="px-4 pb-4 space-y-3">
          <p className="text-xs text-secondary">하나만 선택할 수 있어요</p>

          <div className="grid grid-cols-2 gap-2">
            {card.options.map((opt, i) => (
              <button
                key={i}
                disabled={submitting || picked !== null}
                onClick={() => handleSubmit(i)}
                className={cn(
                  "rounded-lg border p-3 text-left transition-all active:scale-[0.98]",
                  "disabled:pointer-events-none",
                  picked === i
                    ? "border-pink bg-pink/10 shadow-glow-pink"
                    : "border-border bg-bg hover:border-purple/50",
                )}
              >
                <span className="block text-xl mb-1">
                  {OPTION_EMOJIS[i] ?? "○"}
                </span>
                <p
                  className={cn(
                    "text-xs font-semibold leading-tight",
                    picked === i ? "text-pink" : "text-primary",
                  )}
                >
                  {opt}
                </p>
              </button>
            ))}
          </div>

          {/* note field */}
          {picked !== null && (
            <div>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value.slice(0, 100))}
                placeholder="속마음을 적어봐도 좋아 (선택)"
                className="w-full resize-none rounded-lg border border-border bg-bg p-3 text-sm text-primary placeholder:text-tertiary outline-none focus:border-purple/60 transition"
                rows={2}
              />
              <p className="mt-0.5 text-right text-xs text-tertiary">
                {note.length}/100
              </p>
            </div>
          )}

          {/* personality engine feedback */}
          {feedback === "success" && (
            <div className="flex items-center gap-2 rounded-lg bg-purple/10 border border-purple/20 px-3 py-2">
              <span className="text-sm">✨</span>
              <p className="text-xs font-semibold text-purple">
                너의 성향에 반영됐어요
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
