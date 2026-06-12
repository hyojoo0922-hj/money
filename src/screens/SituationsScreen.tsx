import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { QuestionCard } from "@/components/questions/QuestionCard";
import { MingInsightCard } from "@/components/ming/MingInsightCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { cn } from "@/lib/cn";
import { mockDailyCards, mockRelationships } from "@/data/mock";
import { CHARACTERS } from "@/lib/assets";

const TABS = ["추천", "친구가 보낸 카드", "관계방 카드", "완료한 카드"] as const;

export default function SituationsScreen() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("추천");
  const inbox = mockDailyCards.filter((c) => !c.answered);
  const done  = mockDailyCards.filter((c) => c.answered);
  const cards = tab === "완료한 카드" ? done : tab === "추천" ? inbox : inbox.slice(0, 1);

  // context: first relationship shown
  const ctx = mockRelationships[0];

  return (
    <div className="space-y-4 pb-6">
      <div className="flex items-center justify-between px-5 pt-5 pb-0">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-extrabold text-primary">상황카드</h1>
          <button className="flex h-6 w-6 items-center justify-center rounded-full bg-card border border-border text-xs text-secondary">?</button>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-full bg-yellow/15 border border-yellow/30 px-3 py-1">
            <span className="text-yellow text-sm">★</span>
            <span className="text-sm font-bold text-yellow">320</span>
          </div>
          <button className="relative flex h-9 w-9 items-center justify-center rounded-full bg-card border border-border">
            <span className="text-base">🔔</span>
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-pink" />
          </button>
        </div>
      </div>

      {/* tab bar */}
      <div className="no-scrollbar flex gap-1 overflow-x-auto px-5">
        {TABS.map((t) => {
          const count = t === "추천" ? inbox.length : t === "친구가 보낸 카드" ? 2 : t === "관계방 카드" ? 1 : 0;
          return (
            <button key={t} onClick={() => setTab(t)}
              className={cn(
                "shrink-0 rounded-full px-3 py-1.5 text-sm font-semibold transition whitespace-nowrap",
                tab === t
                  ? "bg-grad-cta text-white shadow-glow-pink"
                  : "bg-card border border-border text-secondary"
              )}>
              {t}{count > 0 && ` ${count}`}
            </button>
          );
        })}
      </div>

      {/* situation context hero card */}
      {tab === "추천" && inbox.length > 0 && (
        <div className="mx-5 rounded-xl bg-card border border-border overflow-hidden">
          <div className="flex items-start gap-3 p-4">
            <div className="relative shrink-0">
              <div className="h-16 w-16 rounded-lg overflow-hidden ring-1 ring-border">
                <img src={CHARACTERS[ctx.characterId].src} alt="" className="h-full w-full object-cover object-top" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-bold text-primary">{ctx.name} ›</p>
                <span className="text-[10px] bg-purple/15 text-purple border border-purple/30 rounded-full px-2 py-0.5">친구 관계</span>
              </div>
              <div className="flex items-center gap-3 mt-1.5">
                <div>
                  <p className="text-[11px] text-secondary">♥ 친밀도</p>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-bold text-pink">73</span>
                    <div className="w-16 h-1.5 rounded-full bg-border overflow-hidden">
                      <div className="h-full w-[73%] bg-pink rounded-full" />
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-[11px] text-secondary">🛡 신뢰도</p>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-bold text-blue">81</span>
                    <div className="w-16 h-1.5 rounded-full bg-border overflow-hidden">
                      <div className="h-full w-[81%] bg-blue rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="text-[10px] text-purple">✨ 오늘의 상황</p>
              <p className="text-xs font-bold text-primary">1/3</p>
            </div>
          </div>
          <div className="px-4 pb-4">
            <div className="rounded-lg bg-bg border border-border/50 p-3">
              <p className="text-sm text-primary leading-relaxed">약속 시간에 30분 늦었고, "미안 자고 있었어"라고 연락이 왔어요.</p>
              <p className="text-base font-bold text-pink mt-2">당신이라면 어떻게 할까요?</p>
            </div>
            <p className="mt-2 text-xs text-tertiary">✨ 이 상황 카드는 <span className="text-purple">'관계 방어성'</span>과 <span className="text-purple">'감정 표현 방식'</span>에 영향을 줘요 <span className="text-tertiary">자세히 보기 ›</span></p>
          </div>
        </div>
      )}

      {/* question cards */}
      <div className="space-y-3 px-5">
        {cards.length
          ? cards.map((c) => <QuestionCard key={c.id} card={c} />)
          : <EmptyState title="모든 상황카드를 완료했어!" hint="내일 새 카드가 도착해." />
        }
      </div>

      {/* confirm CTA + MING helper */}
      {tab === "추천" && cards.length > 0 && (
        <div className="px-5 space-y-3">
          <button className="w-full rounded-full bg-grad-cta py-4 text-base font-bold text-white shadow-glow-cta transition active:scale-[0.98]">
            ✨ 선택 완료하고 분석받기
          </button>
          <MingInsightCard emotion="analyzing" title="MING이 알려줄게요! 🧠" message="당신의 선택은 관계에서 어떤 의미를 가질까요? AI 분석으로 더 깊이 알아보세요." ai />
        </div>
      )}

      {/* make your own card */}
      <div className="mx-5 rounded-xl bg-card border border-border p-4 space-y-3">
        <p className="text-sm font-bold text-primary">나만의 질문 만들기</p>
        <input placeholder="질문을 입력해줘"
          className="w-full rounded-lg border border-border bg-bg p-3 text-sm text-primary placeholder:text-tertiary outline-none focus:border-purple/60 transition" />
        {[1,2,3,4].map((i) => (
          <input key={i} placeholder={`선택지 ${i}`}
            className="w-full rounded-lg border border-border bg-bg p-3 text-sm text-primary placeholder:text-tertiary outline-none focus:border-purple/60 transition" />
        ))}
        <button className="w-full rounded-full bg-grad-cta py-3 text-sm font-bold text-white shadow-glow-cta">질문 선물하기</button>
      </div>
    </div>
  );
}
