import { useState } from "react";
import { MingInsightCard } from "@/components/ming/MingInsightCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { cn } from "@/lib/cn";
import { mockDailyCards, type DailyQuestionCard } from "@/data/mock";

const TABS = ["추천", "받은 카드", "완료"] as const;

const optionEmojis = ["😌", "😐", "🟦", "🔥"];

/** Single collapsible question card */
function SituationCard({ card, onDismiss }: { card: DailyQuestionCard; onDismiss: (id: string) => void }) {
  const [expanded, setExpanded] = useState(false);
  const [picked, setPicked] = useState<number | null>(card.answered ? 0 : null);
  const [note, setNote] = useState("");
  const locked = card.answered;

  const weightLabel: Record<DailyQuestionCard["weightType"], string> = {
    light: "가벼운 질문",
    behavior: "행동 질문",
    life_philosophy: "가치관 질문",
    core_relationship: "관계 핵심 질문",
  };

  return (
    <div className="rounded-xl bg-card border border-border overflow-hidden">
      {/* question row — always visible, tap to expand */}
      <button
        className="w-full flex items-start justify-between gap-3 px-4 py-4 text-left"
        onClick={() => !locked && setExpanded((v) => !v)}
      >
        <div className="flex-1 min-w-0">
          <span className="text-[10px] font-semibold text-purple">
            {weightLabel[card.weightType]}
          </span>
          <p className="text-[15px] font-bold text-primary leading-snug mt-0.5">
            {card.question}
          </p>
          {locked && (
            <p className="text-xs text-purple font-semibold mt-1">답변 완료</p>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0 pt-0.5">
          {/* dismiss — only on unanswered, unexpanded */}
          {!locked && !expanded && (
            <button
              onClick={(e) => { e.stopPropagation(); onDismiss(card.id); }}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-border text-tertiary text-xs hover:text-secondary transition"
              aria-label="나중에 답할래"
            >
              ✕
            </button>
          )}
          {!locked && (
            <span className={cn("text-tertiary text-xs transition-transform duration-200", expanded && "rotate-180")}>
              ▾
            </span>
          )}
        </div>
      </button>

      {/* answers — collapsed by default */}
      {expanded && !locked && (
        <div className="px-4 pb-4 space-y-2">
          <p className="text-xs text-secondary mb-2">하나만 선택할 수 있어요</p>

          <div className="grid grid-cols-2 gap-2">
            {card.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => setPicked(i)}
                className={cn(
                  "rounded-lg border p-3 text-left transition-all active:scale-[0.98]",
                  picked === i
                    ? "border-pink bg-pink/10 shadow-glow-pink"
                    : "border-border bg-bg",
                )}
              >
                <span className="block text-xl mb-1">{optionEmojis[i] ?? "○"}</span>
                <p className={cn(
                  "text-xs font-semibold leading-tight",
                  picked === i ? "text-pink" : "text-primary",
                )}>
                  {opt}
                </p>
              </button>
            ))}
          </div>

          {picked !== null && (
            <div className="mt-2">
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value.slice(0, 300))}
                placeholder="속마음을 적어봐도 좋아 (선택)"
                className="w-full resize-none rounded-lg border border-border bg-bg p-3 text-sm text-primary placeholder:text-tertiary outline-none focus:border-purple/60 transition"
                rows={2}
              />
              <p className="mt-0.5 text-right text-xs text-tertiary">{note.length}/300</p>
            </div>
          )}

          {/* dismiss from within expanded view */}
          <button
            onClick={() => onDismiss(card.id)}
            className="w-full py-2 text-xs text-tertiary hover:text-secondary transition"
          >
            나중에 답할래
          </button>
        </div>
      )}
    </div>
  );
}

export default function SituationsScreen() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("추천");
  const [dismissed, setDismissed] = useState<string[]>([]);
  const [answeredLocal, setAnsweredLocal] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  const allInbox = mockDailyCards.filter((c) => !c.answered);
  const done     = mockDailyCards.filter((c) => c.answered);
  const inbox    = allInbox.filter((c) => !dismissed.includes(c.id));

  const cards = tab === "완료" ? done : inbox;

  function handleDismiss(id: string) {
    setDismissed((prev) => [...prev, id]);
  }

  return (
    <div className="pb-4">
      {/* header */}
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <h1 className="text-lg font-extrabold text-primary">상황카드</h1>
        <div className="flex items-center gap-1.5 rounded-full bg-yellow/15 border border-yellow/30 px-3 py-1.5">
          <span className="text-yellow text-xs">★</span>
          <span className="text-sm font-bold text-yellow">320</span>
        </div>
      </div>

      {/* tabs + create toggle */}
      <div className="no-scrollbar flex gap-2 overflow-x-auto px-5 mb-4">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold transition whitespace-nowrap",
              tab === t
                ? "bg-grad-cta text-white shadow-glow-pink"
                : "bg-card border border-border text-secondary",
            )}
          >
            {t}
            {t === "추천" && inbox.length > 0 && (
              <span className="ml-1 opacity-70">{inbox.length}</span>
            )}
          </button>
        ))}
        <button
          onClick={() => setShowCreate((v) => !v)}
          className={cn(
            "shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold transition whitespace-nowrap",
            showCreate
              ? "bg-grad-cta text-white shadow-glow-pink"
              : "bg-card border border-border text-secondary",
          )}
        >
          + 만들기
        </button>
      </div>

      {/* create form — collapsed by default */}
      {showCreate && (
        <div className="mx-5 mb-4 rounded-xl bg-card border border-border p-4 space-y-3">
          <p className="text-sm font-bold text-primary">나만의 질문 만들기</p>
          <input
            placeholder="질문을 입력해줘"
            className="w-full rounded-lg border border-border bg-bg p-3 text-sm text-primary placeholder:text-tertiary outline-none focus:border-purple/60 transition"
          />
          {[1, 2, 3, 4].map((i) => (
            <input
              key={i}
              placeholder={`선택지 ${i}`}
              className="w-full rounded-lg border border-border bg-bg p-3 text-sm text-primary placeholder:text-tertiary outline-none focus:border-purple/60 transition"
            />
          ))}
          <button className="w-full rounded-full bg-grad-cta py-3 text-sm font-bold text-white shadow-glow-cta">
            질문 선물하기
          </button>
        </div>
      )}

      {/* cards — collapsed questions */}
      <div className="space-y-2 px-5">
        {cards.length ? (
          cards.map((c) => (
            <SituationCard
              key={c.id}
              card={c}
              onDismiss={handleDismiss}
            />
          ))
        ) : (
          <EmptyState title="모든 카드를 완료했어!" hint="내일 새 카드가 도착해." />
        )}
      </div>

      {/* CTA + MING — only when cards exist and something answered */}
      {tab === "추천" && cards.length > 0 && (
        <div className="px-5 mt-4 space-y-3">
          <button
            className="w-full rounded-full bg-grad-cta py-4 text-base font-bold text-white shadow-glow-cta active:scale-[0.98] transition"
            onClick={() => setAnsweredLocal("done")}
          >
            ✨ 선택 완료하고 분석받기
          </button>
          {answeredLocal && (
            <MingInsightCard
              emotion="analyzing"
              title="MING이 분석할게요"
              message="선택이 완료되면 관계에서 어떤 의미인지 알려줄게."
              ai
            />
          )}
        </div>
      )}
    </div>
  );
}
