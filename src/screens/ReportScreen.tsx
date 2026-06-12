import { useState } from "react";
import { MingInsightCard } from "@/components/ming/MingInsightCard";
import { Sparkline } from "@/components/ui/Sparkline";
import { CHARACTERS } from "@/lib/assets";

const CHANGE_STATS = [
  { emoji: "😊", label: "공감 표현", value: "+12%", trend: [42,48,55,58,62,66,72], color: "#00E5A8" },
  { emoji: "💬", label: "직접 표현", value: "+8%",  trend: [50,52,54,56,57,58,62], color: "#FF4FDB" },
  { emoji: "🛡️", label: "감정 억제", value: "-5%",  trend: [70,68,66,65,63,62,60], color: "#3882F6" },
  { emoji: "⚖️", label: "정의로움",  value: "+6%",  trend: [78,79,80,81,82,83,86], color: "#FFBA3D" },
];

const RANKING = [
  { rank: 1, name: "민지", pct: 91, id: "F_A" as const },
  { rank: 2, name: "서준", pct: 87, id: "M_A" as const },
  { rank: 3, name: "지은", pct: 78, id: "F_B" as const },
  { rank: 4, name: "현우", pct: 72, id: "M_B" as const },
  { rank: 5, name: "하린", pct: 68, id: "F_C" as const },
];

const BOTTOM_TILES = [
  { emoji: "📈", label: "성향 히스토리", sub: "나의 성향 변화 추이" },
  { emoji: "♥", label: "관계 히스토리", sub: "관계 변화 기록" },
  { emoji: "⭐", label: "나의 강점 분석", sub: "관계 경쟁 확인" },
  { emoji: "🎯", label: "추천 액션", sub: "MING의 행동 제안" },
];

const TEMP_CHART_VALS: Record<string, number[]> = {
  me: [70,74,72,76,80,78,82],
  other: [50,52,55,58,56,60,62],
};

export default function ReportScreen() {
  const [period, setPeriod] = useState<"주간" | "월간">("주간");
  return (
    <div className="pb-6">
      {/* header */}
      <div className="flex items-center justify-between px-5 pt-5 pb-1">
        <div>
          <p className="text-xl font-extrabold text-primary">MINGLEY 리포트</p>
          <p className="text-xs text-secondary mt-0.5">당신의 관계와 성장을 한눈에 확인해요.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-card border border-border">
            <span className="text-base">🔔</span>
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-card border border-border">
            <span className="text-base">⚙️</span>
          </button>
        </div>
      </div>

      {/* MING greeting */}
      <div className="mx-5 mt-3 mb-4 flex items-center gap-3">
        <div className="flex-1">
          <MingInsightCard emotion="reportWriting" message="이번 주도 멋지게 성장했어요! 💜" />
        </div>
      </div>

      {/* period toggle + date range */}
      <div className="mx-5 mb-4 flex items-center gap-3">
        <div className="flex rounded-full bg-card border border-border p-1 gap-1">
          {(["주간","월간"] as const).map((p) => (
            <button key={p} onClick={() => setPeriod(p)}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                period === p ? "bg-grad-cta text-white shadow-glow-pink" : "text-secondary"
              }`}>
              {p} 리포트
            </button>
          ))}
        </div>
        <button className="ml-auto flex items-center gap-1 rounded-full bg-card border border-border px-3 py-1.5 text-xs text-secondary">
          📅 5.25 - 5.31 ▾
        </button>
      </div>

      {/* change stat cards */}
      <div className="mx-5 mb-4 rounded-xl bg-card border border-border p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="font-bold text-primary">나의 변화 한눈에 보기</p>
          <button className="text-xs text-purple">자세히 보기 ›</button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {CHANGE_STATS.map((s) => (
            <div key={s.label} className="rounded-lg bg-bg border border-border/50 p-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-base">{s.emoji}</span>
                <p className="text-xs text-secondary">{s.label}</p>
              </div>
              <p className="text-xl font-extrabold" style={{ color: s.color }}>{s.value}</p>
              <p className="text-[10px] text-tertiary mb-1.5">지난주 대비</p>
              <Sparkline values={s.trend} width={80} height={28} color={s.color} />
            </div>
          ))}
        </div>
      </div>

      {/* ranking + temp chart side by side */}
      <div className="mx-5 mb-4 grid grid-cols-2 gap-3">
        {/* ranking */}
        <div className="rounded-xl bg-card border border-border p-3">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold text-primary">관계 랭킹 TOP 5</p>
            <button className="text-[10px] text-purple">더보기 ›</button>
          </div>
          {RANKING.map((r) => (
            <div key={r.name} className="flex items-center gap-2 mb-1.5">
              <span className="text-sm w-4 text-center">{["🥇","🥈","🥉","4","5"][r.rank-1]}</span>
              <div className="h-7 w-7 overflow-hidden rounded-full ring-1 ring-border shrink-0">
                <img src={CHARACTERS[r.id].src} alt="" className="h-full w-full object-cover object-top" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-semibold text-primary truncate">{r.name}</p>
                <div className="flex items-center gap-1">
                  <span className="text-pink text-[10px]">♥</span>
                  <span className="text-[10px] font-bold text-primary">{r.pct}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* relationship temperature chart */}
        <div className="rounded-xl bg-card border border-border p-3">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold text-primary">관계 온도 변화</p>
            <button className="text-[10px] text-purple">더보기 ›</button>
          </div>
          <div className="flex items-center gap-3 text-[10px] mb-2">
            <span className="flex items-center gap-1"><span className="inline-block h-2 w-4 rounded-full bg-pink"></span>민지</span>
            <span className="flex items-center gap-1"><span className="inline-block h-2 w-4 rounded-full bg-blue"></span>서준</span>
          </div>
          <Sparkline values={TEMP_CHART_VALS.me}    width={130} height={50} color="#FF4FDB" />
          <Sparkline values={TEMP_CHART_VALS.other} width={130} height={50} color="#3882F6" />
          <p className="mt-1 text-[10px] text-pink">♥ 민지님과의 관계가 꾸준히 따뜻해지고 있어요!</p>
        </div>
      </div>

      {/* best match + most growth */}
      <div className="mx-5 mb-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-card border border-border p-3">
          <p className="text-xs font-bold text-primary mb-2">가장 잘 맞는 사람</p>
          <div className="h-20 w-full overflow-hidden rounded-lg mb-2">
            <img src={CHARACTERS["F_A"]} alt="" className="h-full w-full object-cover object-top" />
          </div>
          <p className="text-sm font-bold text-primary">민지</p>
          <p className="text-[11px] text-secondary">서로의 가치관과 표현 방식이 가장 잘 맞아요!</p>
          <div className="flex flex-wrap gap-1 mt-2">
            <span className="text-[10px] rounded-full bg-purple/10 border border-purple/20 px-2 py-0.5 text-purple">가치관 유사도 높음</span>
          </div>
        </div>
        <div className="rounded-xl bg-card border border-border p-3">
          <p className="text-xs font-bold text-primary mb-2">가장 성장한 관계</p>
          <div className="h-20 w-full overflow-hidden rounded-lg mb-2">
            <img src={CHARACTERS["M_A"]} alt="" className="h-full w-full object-cover object-top" />
          </div>
          <p className="text-sm font-bold text-primary">서준</p>
          <p className="text-xl font-extrabold text-green">+13%</p>
          <p className="text-[11px] text-secondary">지난주 대비 관계가 가장 많이 성장했어요!</p>
          <button className="mt-1 text-[10px] text-purple">⊙ 관계 성장 히스토리 ›</button>
        </div>
      </div>

      {/* MING comprehensive analysis */}
      <div className="mx-5 mb-4">
        <MingInsightCard emotion="analyzingWork" title="MING의 종합 분석" ai
          message="최근 버블걸님은 상대를 이해하려는 노력이 눈에 띄게 늘어나고 있어요. 특히 공감 표현이 증가하면서 관계 만족도가 높아지고 있어요! 계속 좋은 흐름을 이어가봐요! ✨" />
      </div>

      {/* bottom action tiles */}
      <div className="mx-5 grid grid-cols-4 gap-2">
        {BOTTOM_TILES.map((tile) => (
          <button key={tile.label} className="flex flex-col items-center gap-1 rounded-xl bg-card border border-border p-3">
            <span className="text-xl">{tile.emoji}</span>
            <p className="text-[11px] font-semibold text-primary text-center">{tile.label}</p>
            <p className="text-[10px] text-tertiary text-center">{tile.sub}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
