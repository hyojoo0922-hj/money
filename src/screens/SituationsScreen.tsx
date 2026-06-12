import { useState } from "react";
import { QuestionCard } from "@/components/questions/QuestionCard";
import { MingInsightCard } from "@/components/ming/MingInsightCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { cn } from "@/lib/cn";
import { mockDailyCards } from "@/data/mock";

const TABS = ["추천", "받은 카드", "완료"] as const;

export default function SituationsScreen() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("추천");
  const [answered, setAnswered] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  const inbox = mockDailyCards.filter((c) => !c.answered);
  const done  = mockDailyCards.filter((c) => c.answered);
  const cards = tab === "완료" ? done : inbox;

  return (
    <div className="pb-4">
      {/* header */}
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <h1 className="text-lg font-extrabold text-primary">상황카드</h1>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-full bg-yellow/15 border border-yellow/30 px-3 py-1.5">
            <span className="text-yellow text-xs">★</span>
            <span className="text-sm font-bold text-yellow">320</span>
          </div>
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

      {/* create form — hidden by default */}
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

      {/* question cards — primary content */}
      <div className="space-y-3 px-5">
        {cards.length ? (
          cards.map((c) => (
            <div key={c.id} onClick={() => setAnswered(c.id)}>
              <QuestionCard card={c} />
            </div>
          ))
        ) : (
          <EmptyState title="모든 카드를 완료했어!" hint="내일 새 카드가 도착해." />
        )}
      </div>

      {/* CTA — always visible when cards exist */}
      {tab === "추천" && cards.length > 0 && (
        <div className="px-5 mt-4 space-y-3">
          <button className="w-full rounded-full bg-grad-cta py-4 text-base font-bold text-white shadow-glow-cta active:scale-[0.98] transition">
            ✨ 선택 완료하고 분석받기
          </button>
          {/* MING coaching — shown only after an answer is tapped */}
          {answered && (
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
