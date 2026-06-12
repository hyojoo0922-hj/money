import { useNavigate } from "react-router-dom";
import { MingGuide } from "@/components/ming/MingGuide";
import type { MingKey } from "@/lib/assets";

const points: { e: MingKey; t: string; d: string }[] = [
  { e: "chat",          t: "매일 상황카드에 답해", d: "12개의 카드가 너의 성향을 그려가." },
  { e: "analyzing",     t: "성향이 아키타입이 돼",  d: "'답장망상가'처럼 사람을 관찰한 별명으로." },
  { e: "newRelation",   t: "관계를 키워",           d: "질문을 주고받으며 온도를 올려." },
  { e: "evolution",     t: "캐릭터가 진화해",        d: "얼굴은 그대로, 지금의 너를 보여줘." },
];

export default function IntroScreen() {
  const nav = useNavigate();
  return (
    <div className="flex min-h-[100dvh] flex-col bg-bg px-6 pb-8 pt-12">
      <div className="mx-auto w-full max-w-[480px]">
        <div className="flex flex-col items-center gap-2 text-center">
          <MingGuide emotion="happy" size="xl" float />
          <h1 className="text-2xl font-extrabold text-primary">난 MING이야!</h1>
          <p className="text-sm text-secondary">앞으로 너의 관계를 함께 관찰할게.</p>
        </div>
        <div className="mt-6 space-y-3">
          {points.map((p) => (
            <div key={p.t} className="flex items-center gap-3 rounded-xl bg-card border border-border p-3.5 shadow-glow-card">
              <MingGuide emotion={p.e} size="sm" />
              <div>
                <p className="text-sm font-bold text-primary">{p.t}</p>
                <p className="text-xs text-secondary">{p.d}</p>
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => nav("/")}
          className="mt-8 w-full rounded-full bg-grad-cta py-4 text-base font-bold text-white shadow-glow-cta transition active:scale-[0.97]">
          MINGLEY 시작하기
        </button>
      </div>
    </div>
  );
}
