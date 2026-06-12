import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { OnbStep } from "./_Step";
import { MingGuide } from "@/components/ming/MingGuide";
import { cn } from "@/lib/cn";

const CORE = [
  { q: "친구가 답장이 늦으면?", opts: ["별생각 없음", "한 번 확인", "이유 상상", "계속 신경 쓰임"] },
  { q: "약속이 취소되면 첫 감정은?", opts: ["오히려 좋아", "조금 아쉬움", "서운함", "걱정됨"] },
  { q: "처음 만난 모임에서 나는?", opts: ["분위기를 띄움", "편한 사람과", "조용히 관찰", "집에 가고 싶음"] },
  { q: "중요한 결정 앞에서?", opts: ["일단 저지름", "리스트 작성", "주변에 물어봄", "밤새 고민"] },
  { q: "스트레스를 풀 때?", opts: ["사람을 만남", "혼자 쉼", "운동/활동", "콘텐츠 몰입"] },
];
const OPT_EMOJI = ["😌","😐","🟦","🚪"];

export default function CoreQuestionsScreen() {
  const nav = useNavigate();
  const { state } = useLocation() as { state?: { gender?: "female" | "male" } };
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const cur = CORE[i];
  const last = i === CORE.length - 1;
  function next() {
    if (picked === null) return;
    if (last) nav("/onboarding/recommend", { state });
    else { setI(i + 1); setPicked(null); }
  }
  return (
    <OnbStep step={3} total={6}>
      <div className="flex items-center gap-3 mb-5">
        <MingGuide emotion="thinking" size="sm" />
        <p className="text-sm text-secondary">핵심 질문 {i + 1} / {CORE.length}</p>
      </div>
      <h1 className="text-xl font-extrabold text-primary leading-snug">{cur.q}</h1>
      <p className="mt-1 mb-5 text-xs text-secondary">하나만 선택할 수 있어요</p>
      <div className="grid grid-cols-2 gap-2">
        {cur.opts.map((o, idx) => (
          <button key={idx} onClick={() => setPicked(idx)}
            className={cn("rounded-xl border p-4 text-left transition active:scale-[0.97]",
              picked === idx ? "border-pink bg-pink/10 shadow-glow-pink" : "border-border bg-card")}>
            <span className="block text-2xl mb-2">{OPT_EMOJI[idx]}</span>
            <p className={cn("text-sm font-semibold", picked === idx ? "text-pink" : "text-primary")}>{o}</p>
          </button>
        ))}
      </div>
      <button disabled={picked === null} onClick={next}
        className="mt-8 w-full rounded-full bg-grad-cta py-4 text-base font-bold text-white shadow-glow-cta disabled:opacity-40 disabled:pointer-events-none transition active:scale-[0.97]">
        {last ? "분석 시작" : "다음"}
      </button>
    </OnbStep>
  );
}
