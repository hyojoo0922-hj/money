import { useState } from "react";
import { MingGuide } from "@/components/ming/MingGuide";
import { Sparkline } from "@/components/ui/Sparkline";
import { CHARACTERS, type CharacterId } from "@/lib/assets";
import { mockProfile, mockPrimaryArchetype, mockEvolutionHistory } from "@/data/mock";
import { cn } from "@/lib/cn";

const CHANGE_STATS = [
  { emoji: "😊", label: "공감 표현", value: "+12%", trend: [42,48,55,58,62,66,72], color: "#00E5A8" },
  { emoji: "💬", label: "직접 표현", value: "+8%",  trend: [50,52,54,56,57,58,62], color: "#FF4FDB" },
  { emoji: "🛡️", label: "감정 억제", value: "-5%",  trend: [70,68,66,65,63,62,60], color: "#3882F6" },
  { emoji: "⚖️", label: "정의로움",  value: "+6%",  trend: [78,79,80,81,82,83,86], color: "#FFBA3D" },
];

const RANKING: { rank: number; name: string; pct: number; id: CharacterId }[] = [
  { rank: 1, name: "민지", pct: 91, id: "F_A" },
  { rank: 2, name: "서준", pct: 87, id: "M_A" },
  { rank: 3, name: "지은", pct: 78, id: "F_B" },
  { rank: 4, name: "현우", pct: 72, id: "M_B" },
  { rank: 5, name: "하린", pct: 68, id: "F_C" },
];
const MEDALS = ["🥇", "🥈", "🥉", "4", "5"];

const TEMP_CHART_VALS: Record<string, number[]> = {
  me:    [70, 74, 72, 76, 80, 78, 82],
  other: [50, 52, 55, 58, 56, 60, 62],
};

const BEST_ID: CharacterId = "F_A";

function Accordion({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl bg-card border border-border overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3.5 text-sm font-bold text-primary"
      >
        {label}
        <span className={cn("text-tertiary text-xs transition-transform duration-200", open && "rotate-180")}>▾</span>
      </button>
      {open && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
}

export default function ReportScreen() {
  const [period, setPeriod] = useState<"주간" | "월간">("주간");

  return (
    <div className="pb-4">

      {/* ── ARCHETYPE HERO — primary element ── */}
      <div
        className="mx-5 mt-5 mb-4 relative overflow-hidden rounded-xl border border-purple/30"
        style={{ background: "linear-gradient(135deg, #2D1B6E 0%, #1A0E3D 60%, #0E0B16 100%)", minHeight: "160px" }}
      >
        <div className="relative z-10 p-5 max-w-[62%]">
          <p className="text-xs font-semibold text-purple mb-1">이번 주의 나</p>
          <p className="text-2xl font-black text-grad-cta leading-tight">
            {mockPrimaryArchetype.emoji} {mockPrimaryArchetype.name_ko}
          </p>
          <p className="text-xs text-secondary mt-1.5 leading-snug">
            답장이 늦으면 머릿속이 바빠지는 사람
          </p>
          <div className="mt-3 flex items-center gap-2">
            <MingGuide emotion="reportWriting" size="xs" />
            <p className="text-xs text-secondary leading-snug">
              공감 표현이 눈에 띄게 늘었어 ✨
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 h-full flex items-end">
          <img
            src={CHARACTERS[mockProfile.characterId].src}
            alt="이번 주의 나"
            className="h-[150px] w-auto object-contain object-bottom"
            style={{ maxWidth: "140px" }}
          />
        </div>
      </div>

      {/* ── EVOLUTION TIMELINE — open by default ── */}
      <div className="px-5 mb-4">
        <p className="text-xs font-semibold text-secondary mb-3">나의 변화 히스토리</p>
        <div className="flex items-center gap-2">
          {mockEvolutionHistory.map((e, i) => (
            <div key={e.id} className="flex items-center gap-2">
              <div className="flex flex-col items-center">
                <div className="w-[72px] aspect-[3/4] overflow-hidden rounded-lg bg-white ring-1 ring-border">
                  <img
                    src={CHARACTERS[e.characterId].src}
                    alt=""
                    className="h-full w-full object-contain object-top"
                  />
                </div>
                <p className="text-[10px] font-bold text-primary mt-1 text-center leading-tight">
                  {e.archetypeName}
                </p>
                <p className="text-[9px] text-tertiary text-center">{e.date}</p>
              </div>
              {i < mockEvolutionHistory.length - 1 && (
                <span className="text-tertiary text-base shrink-0">→</span>
              )}
            </div>
          ))}
          {/* current — highlighted */}
          <div className="flex items-center gap-2">
            <span className="text-tertiary text-base shrink-0">→</span>
            <div className="flex flex-col items-center">
              <div className="w-[72px] aspect-[3/4] overflow-hidden rounded-lg bg-white ring-2 ring-pink shadow-glow-pink">
                <img
                  src={CHARACTERS[mockProfile.characterId].src}
                  alt=""
                  className="h-full w-full object-contain object-top"
                />
              </div>
              <p className="text-[10px] font-bold text-pink mt-1 text-center leading-tight">
                {mockPrimaryArchetype.name_ko}
              </p>
              <p className="text-[9px] text-pink text-center">지금</p>
            </div>
          </div>
        </div>
      </div>

      {/* period toggle */}
      <div className="flex items-center justify-between px-5 mb-4">
        <p className="text-sm font-extrabold text-primary">MINGLEY 리포트</p>
        <div className="flex rounded-full bg-card border border-border p-1 gap-1">
          {(["주간", "월간"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                period === p ? "bg-grad-cta text-white" : "text-secondary"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* ── 4 change-stat cards — below timeline ── */}
      <div className="px-5 mb-4">
        <p className="text-xs font-semibold text-secondary mb-2">이번 주 변화</p>
        <div className="grid grid-cols-2 gap-2">
          {CHANGE_STATS.map((s) => (
            <div key={s.label} className="rounded-xl bg-card border border-border p-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-base">{s.emoji}</span>
                <p className="text-xs text-secondary">{s.label}</p>
              </div>
              <p className="text-xl font-extrabold" style={{ color: s.color }}>{s.value}</p>
              <p className="text-[10px] text-tertiary mb-1.5">지난주 대비</p>
              <Sparkline values={s.trend} width={90} height={28} color={s.color} />
            </div>
          ))}
        </div>
      </div>

      {/* ranking */}
      <div className="px-5 mb-4">
        <div className="rounded-xl bg-card border border-border p-4">
          <p className="text-sm font-bold text-primary mb-3">관계 랭킹 TOP 5</p>
          {RANKING.map((r) => (
            <div key={r.name} className="flex items-center gap-2 mb-2 last:mb-0">
              <span className="text-sm w-5 text-center shrink-0">{MEDALS[r.rank - 1] ?? r.rank}</span>
              <div className="h-8 w-8 overflow-hidden rounded-full bg-white ring-1 ring-border shrink-0">
                <img src={CHARACTERS[r.id].src} alt="" className="h-full w-full object-contain object-top" />
              </div>
              <p className="flex-1 text-sm font-semibold text-primary">{r.name}</p>
              <div className="flex items-center gap-1">
                <span className="text-pink text-xs">♥</span>
                <span className="text-sm font-bold text-primary">{r.pct}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* secondary — accordions */}
      <div className="px-5 space-y-2">
        <Accordion label="관계 온도 변화">
          <div className="flex items-center gap-3 text-[10px] mb-2 mt-2">
            <span className="flex items-center gap-1"><span className="inline-block h-2 w-4 rounded-full bg-pink" />민지</span>
            <span className="flex items-center gap-1"><span className="inline-block h-2 w-4 rounded-full bg-blue" />서준</span>
          </div>
          <Sparkline values={TEMP_CHART_VALS.me}    width={260} height={50} color="#FF4FDB" />
          <Sparkline values={TEMP_CHART_VALS.other} width={260} height={50} color="#3882F6" />
          <p className="mt-2 text-[11px] text-pink">♥ 민지님과의 관계가 꾸준히 따뜻해지고 있어요!</p>
        </Accordion>

        <Accordion label="가장 잘 맞는 사람">
          <div className="flex items-center gap-3 mt-2">
            <div className="h-16 w-16 overflow-hidden rounded-xl bg-white shrink-0">
              <img src={CHARACTERS[BEST_ID].src} alt="" className="h-full w-full object-contain object-top" />
            </div>
            <div>
              <p className="text-sm font-bold text-primary">민지</p>
              <p className="text-xs text-secondary mt-0.5">가치관과 표현 방식이 가장 잘 맞아요!</p>
              <span className="mt-1.5 inline-block text-[10px] rounded-full bg-purple/10 border border-purple/20 px-2 py-0.5 text-purple">
                가치관 유사도 높음
              </span>
            </div>
          </div>
        </Accordion>
      </div>
    </div>
  );
}
