import { useState } from "react";
import { CHARACTERS } from "@/lib/assets";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";
import { PremiumLabel } from "@/components/ui/PremiumLock";
import { Sparkline } from "@/components/ui/Sparkline";
import { MingGuide } from "@/components/ming/MingGuide";
import { mockProfile, mockPrimaryArchetype, mockTopTraits, mockEvolutionHistory } from "@/data/mock";
import { cn } from "@/lib/cn";

const DNA_TRAITS = [
  { emoji: "♥", label: "공감력", value: 92, color: "bg-pink",   text: "text-pink"   },
  { emoji: "✦", label: "직관성", value: 88, color: "bg-purple", text: "text-purple" },
  { emoji: "🛡", label: "신중함", value: 76, color: "bg-blue",   text: "text-blue"   },
];

const ACCURACY_TREND = [79, 81, 84, 87, 89, 91, 92];

const ACTIVITY = [
  { emoji: "🎴", label: "상황카드", value: 38, delta: "+6" },
  { emoji: "🃏", label: "너라면",   value: 12, delta: "+3" },
  { emoji: "🏠", label: "관계방",   value: 7,  delta: "+2" },
  { emoji: "👥", label: "관계 수",  value: 8,  delta: "-"  },
];

const KEYWORDS = ["따뜻함", "솔직함", "정의로움", "직설적", "감성적"];
const SETTINGS  = ["공개 설정", "SNS 연동", "알림 설정", "계정 설정", "도움말"];

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

export default function ProfileScreen() {
  const [mingExpanded, setMingExpanded] = useState(false);

  return (
    <div className="pb-4">

      {/* ── CHARACTER PORTRAIT — full-width hero ── */}
      <div
        className="relative overflow-hidden mx-5 mt-5 rounded-xl border border-purple/30"
        style={{ background: "linear-gradient(160deg, #1A1235 0%, #0E0B16 100%)", minHeight: "220px" }}
      >
        {/* portrait — dominant */}
        <div className="flex justify-center pt-4">
          <div
            className="overflow-hidden rounded-xl bg-white ring-pink-neon"
            style={{ width: "140px", height: "175px" }}
          >
            <img
              src={CHARACTERS[mockProfile.characterId].src}
              alt={mockProfile.displayName}
              className="h-full w-full object-contain object-top"
            />
          </div>
        </div>
        {/* name + archetype as title */}
        <div className="text-center px-5 pt-3 pb-5">
          <p className="text-sm text-secondary">{mockProfile.displayName}</p>
          <p className="text-2xl font-black text-grad-cta leading-tight mt-0.5">
            {mockPrimaryArchetype.emoji} {mockPrimaryArchetype.name_ko}
          </p>
          {/* 나다움 — supporting metric */}
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="text-lg font-black text-pink">92%</span>
            <span className="text-xs font-bold text-pink">나다움</span>
            <span className="text-xs text-secondary">· 나답게 성장 중 ✨</span>
          </div>
        </div>
      </div>

      {/* ── EVOLUTION STRIP — open by default ── */}
      <div className="px-5 mt-4 mb-4">
        <p className="text-xs font-semibold text-secondary mb-3">나의 변화 히스토리</p>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {mockEvolutionHistory.map((e, i) => (
            <div key={e.id} className="flex items-center gap-2 shrink-0">
              <div className="flex flex-col items-center">
                <div className="w-[68px] aspect-[3/4] overflow-hidden rounded-lg bg-white ring-1 ring-border">
                  <img
                    src={CHARACTERS[e.characterId].src}
                    alt=""
                    className="h-full w-full object-contain object-top"
                  />
                </div>
                <p className="text-[10px] font-bold text-primary mt-1 text-center leading-tight w-[68px]">
                  {e.archetypeName}
                </p>
                <p className="text-[9px] text-tertiary text-center">{e.date}</p>
              </div>
              {i < mockEvolutionHistory.length - 1 && (
                <span className="text-tertiary text-sm shrink-0">→</span>
              )}
            </div>
          ))}
          {/* current — highlighted */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-tertiary text-sm shrink-0">→</span>
            <div className="flex flex-col items-center">
              <div className="w-[68px] aspect-[3/4] overflow-hidden rounded-lg bg-white ring-2 ring-pink shadow-glow-pink">
                <img
                  src={CHARACTERS[mockProfile.characterId].src}
                  alt=""
                  className="h-full w-full object-contain object-top"
                />
              </div>
              <p className="text-[10px] font-bold text-pink mt-1 text-center leading-tight w-[68px]">
                {mockPrimaryArchetype.name_ko}
              </p>
              <p className="text-[9px] text-pink text-center">지금</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── level / EXP / keywords — below evolution ── */}
      <div className="px-5 mb-4">
        <div className="flex items-center gap-3 mb-3">
          <Badge tone="pink">Lv.{mockProfile.level}</Badge>
          <span className="text-xs text-secondary">1,250 / 2,000 EXP</span>
          <ProgressBar value={62.5} tone="cta" height="h-1.5" className="flex-1 max-w-[120px]" />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {KEYWORDS.map((k) => (
            <span
              key={k}
              className="rounded-full bg-purple/10 border border-purple/20 px-2.5 py-1 text-xs font-semibold text-purple"
            >
              {k}
            </span>
          ))}
        </div>
      </div>

      {/* MING commentary */}
      <div className="mx-5 mb-4 rounded-xl bg-card border border-purple/20 p-3">
        <button
          onClick={() => setMingExpanded((v) => !v)}
          className="w-full flex items-center gap-3 text-left"
        >
          <MingGuide emotion="happy" size="sm" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-pink">요즘 너의 변화 💜</p>
            <p className="text-xs text-secondary truncate">
              감정을 더 솔직하게 표현하고 있어! 작은 변화들이 너를 더 단단하게 만들고 있어 ✨
            </p>
          </div>
          <span className={cn("text-tertiary text-xs shrink-0 transition-transform duration-200", mingExpanded && "rotate-180")}>▾</span>
        </button>
        {mingExpanded && (
          <div className="mt-3 pt-3 border-t border-border/50 space-y-1.5">
            {[
              ["😊", "솔직함 상승",   "↑ 15%", "text-green"],
              ["♥",  "공감 표현 증가", "↑ 12%", "text-pink" ],
              ["🛡", "감정 억제 감소", "↓ 8%",  "text-blue" ],
            ].map(([e, l, v, c]) => (
              <div key={String(l)} className="flex items-center gap-2">
                <span className="text-sm">{e}</span>
                <p className="flex-1 text-xs text-secondary">{l}</p>
                <span className={`text-xs font-bold ${c}`}>{v}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* top 3 DNA traits */}
      <div className="px-5 mb-4">
        <p className="text-xs font-semibold text-secondary mb-2">성향 DNA</p>
        <div className="grid grid-cols-3 gap-2">
          {DNA_TRAITS.map((t) => (
            <div key={t.label} className="rounded-xl bg-card border border-border p-3 flex flex-col gap-1">
              <span className="text-base">{t.emoji}</span>
              <p className={`text-xl font-extrabold ${t.text} leading-none`}>{t.value}</p>
              <div className={`h-1 w-10 rounded-full ${t.color}`} />
              <p className="text-[11px] text-secondary">{t.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* accordions */}
      <div className="px-5 space-y-2">
        <Accordion label="7일 변화 그래프">
          <div className="pt-2">
            <Sparkline values={ACCURACY_TREND} width={280} height={60} color="#FF4FDB" />
            <div className="flex justify-between text-[10px] text-tertiary px-1 mt-1">
              {["6/3","6/4","6/5","6/6","6/7","6/8","오늘"].map((d) => (
                <span key={d}>{d}</span>
              ))}
            </div>
            <p className="mt-2 text-xs text-green font-semibold">+13% 지난 주 대비 성장했어요!</p>
          </div>
        </Accordion>

        <Accordion label="활동 데이터">
          <div className="grid grid-cols-4 gap-2 pt-2">
            {ACTIVITY.map((a) => (
              <div key={a.label} className="text-center rounded-lg bg-bg border border-border/50 p-2">
                <p className="text-lg mb-0.5">{a.emoji}</p>
                <p className="text-lg font-extrabold text-primary leading-none">{a.value}</p>
                <p className="text-[10px] text-secondary mt-0.5">{a.label}</p>
                <p className="text-[9px] text-green mt-0.5">{a.delta}</p>
              </div>
            ))}
          </div>
        </Accordion>

        <div className="rounded-xl bg-card border border-border px-4 py-3 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-primary">더 깊이 알고 싶다면</p>
            <p className="text-xs text-tertiary mt-0.5">AI 인간 리포트 · 미래 시뮬레이션</p>
          </div>
          <PremiumLabel />
        </div>

        <Accordion label="설정">
          <div className="space-y-1 pt-1">
            {SETTINGS.map((s) => (
              <button
                key={s}
                className="w-full flex items-center justify-between py-2.5 text-sm text-primary border-b border-border/30 last:border-0"
              >
                {s}
                <span className="text-tertiary text-xs">›</span>
              </button>
            ))}
          </div>
        </Accordion>
      </div>
    </div>
  );
}
