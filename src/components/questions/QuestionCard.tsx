import { useState } from "react";
import { cn } from "@/lib/cn";
import type { DailyQuestionCard } from "@/data/mock";

const weightLabel: Record<DailyQuestionCard["weightType"], string> = {
  light: "가벼운 질문",
  behavior: "행동 질문",
  life_philosophy: "가치관 질문",
  core_relationship: "관계 핵심 질문",
};

// Emoji option icons per answer index for visual richness
const optionEmoji = ["😌","😐","🟦","🚪","🔥"];

export function QuestionCard({ card }: { card: DailyQuestionCard }) {
  const [picked, setPicked] = useState<number | null>(card.answered ? 0 : null);
  const [note, setNote] = useState("");
  const locked = card.answered;

  return (
    <div className="rounded-xl bg-card border border-border overflow-hidden shadow-glow-card">
      {/* header */}
      <div className="bg-purple/10 border-b border-border px-4 py-3 flex items-center justify-between">
        <span className="text-xs font-semibold text-purple">{weightLabel[card.weightType]}</span>
        <span className="text-xs text-tertiary">{card.daysLeft}일 남음</span>
      </div>
      {/* question */}
      <div className="px-4 pt-4 pb-2">
        <p className="text-base font-bold leading-snug text-primary">{card.question}</p>
        <p className="mt-1 text-xs text-secondary">하나만 선택할 수 있어요</p>
      </div>
      {/* options — emoji card grid (matches reference) */}
      <div className="grid grid-cols-2 gap-2 px-4 pb-3">
        {card.options.map((opt, i) => (
          <button
            key={i}
            disabled={locked}
            onClick={() => setPicked(i)}
            className={cn(
              "relative rounded-lg border p-3 text-left transition-all duration-200 active:scale-[0.97]",
              picked === i
                ? "border-pink bg-pink/10 shadow-glow-pink"
                : "border-border bg-bg hover:border-purple/50"
            )}
          >
            {picked === i && (
              <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-pink text-[10px] text-white">✓</span>
            )}
            <span className="block text-xl mb-1">{optionEmoji[i]}</span>
            <p className={cn("text-xs font-semibold leading-tight", picked === i ? "text-pink" : "text-primary")}>{opt}</p>
          </button>
        ))}
      </div>
      {/* note field */}
      {picked !== null && !locked && (
        <div className="px-4 pb-3">
          <p className="mb-1.5 text-xs text-secondary">✏️ 추가로 적기 <span className="text-tertiary">(선택)</span></p>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value.slice(0, 300))}
            placeholder="실제로 할 말이나 속마음을 적어보세요..."
            className="w-full resize-none rounded-lg border border-border bg-bg p-3 text-sm text-primary placeholder:text-tertiary outline-none focus:border-purple/60 transition"
            rows={2}
          />
          <p className="mt-0.5 text-right text-xs text-tertiary">{note.length}/300</p>
        </div>
      )}
      {/* trait effect hint */}
      <div className="border-t border-border/50 px-4 py-2.5 flex items-center justify-between">
        {locked
          ? <p className="text-xs font-semibold text-purple">답변 완료 · 수정 불가</p>
          : <p className="text-xs text-tertiary">✨ 이 카드는 <span className="text-purple">관계 방어성</span>과 <span className="text-purple">감정 표현 방식</span>에 영향을 줘요</p>
        }
      </div>
    </div>
  );
}
