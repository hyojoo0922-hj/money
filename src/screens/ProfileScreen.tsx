import { useState } from "react";
import { CHARACTERS } from "@/lib/assets";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";
import { PremiumLabel } from "@/components/ui/PremiumLock";
import { Sparkline } from "@/components/ui/Sparkline";
import { MingGuide } from "@/components/ming/MingGuide";
import { ArchetypeCard } from "@/components/ui/ArchetypeCard";
import { mockProfile, mockTopTraits, mockEvolutionHistory } from "@/data/mock";
import { usePersonalityScores } from "@/hooks/usePersonalityScores";
import { useArchetypeImage } from "@/hooks/useArchetypeImage";
import { cn } from "@/lib/cn";

const DNA_TRAITS = [
  { emoji: "♥", label: "공감력", value: 92, color: "bg-pink",   text: "text-pink"   },
  { emoji: "✦", label: "직관성", value: 88, color: "bg-purple", text: "text-purple" },
  { emoji: "🛡", label: "신중함", value: 76, color: "bg-blue",   text: "text-blue"   },
];

const ACCURACY_TREND = [79,81,84,87,89,91,92];

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
  // Live archetype — falls back to 답장망상가 if Supabase unavailable
  const { archetype } = usePersonalityScores();
  // Evolved character image — falls back to base character if not generated yet
  const {
    src: evolutionSrc,
    status: genStatus,
    ticketsRemaining,
    triggerGeneration,
    errorMessage,
  } = useArchetypeImage(mockProfile.characterId, archetype.key);

  return (
    <div className="pb-4">

      {/* CHARACTER PORTRAIT — full-width hero */}
      <div
        className="relative overflow-hidden mx-5 mt-5 rounded-xl border border-purple/30"
        style={{ background: "linear-gradient(160deg, #1A1235 0%, #0E0B16 100%)", minHeight: "240px" }}
      >
        <div className="flex justify-center pt-5">
          <div
            className="overflow-hidden rounded-xl bg-gradient-to-b from-[#1A1235] to-[#0E0B16] ring-pink-neon"
            style={{ width: "140px", height: "187px" }}
          >
            <img
              src={evolutionSrc}
              alt={mockProfile.displayName}
              className="h-full w-full object-contain object-top"
              draggable={false}
            />
            {genStatus === "pending" && (
              <div className="absolute inset-0 flex items-end justify-center pb-2 bg-purple/10 rounded-xl">
                <span className="text-[10px] font-bold text-purple bg-card/80 px-2 py-0.5 rounded-full">진화 중… ✨</span>
              </div>
            )}
          </div>
        </div>
        {/* live archetype as screen title */}
        <div className="text-center px-5 pt-3 pb-5">
          <p className="text-sm text-secondary">{mockProfile.displayName}</p>
          <p className="text-2xl font-black text-grad-cta leading-tight mt-0.5">
            {archetype.emoji} {archetype.name_ko}
          </p>
          <div className="flex items-center justify-center gap-2 mt-1.5">
            <span className="text-lg font-black text-pink">92%</span>
            <span className="text-xs font-bold text-pink">나다움</span>
            <span className="text-xs text-secondary">· 나답게 성장 중 ✨</span>
          </div>
        </div>
      </div>

      {/* GENERATION CTA */}
      <div className="px-5 mt-3 mb-2">
        {genStatus === "ready" ? null : genStatus === "pending" ? (
          <div className="flex items-center justify-center gap-2 rounded-xl bg-card border border-purple/20 py-3">
            <span className="text-sm animate-pulse">✨</span>
            <p className="text-sm font-semibold text-purple">진화 중… 잠시만 기다려줘</p>
          </div>
        ) : genStatus === "no_tickets" ? (
          <div className="rounded-xl bg-card border border-border px-4 py-3 text-center">
            <p className="text-xs text-secondary">티켓이 없어</p>
            <p className="text-xs text-tertiary mt-0.5">레벨 5에서 무료 진화가 가능해</p>
          </div>
        ) : (
          <div>
            <button
              onClick={triggerGeneration}
              className="w-full rounded-full bg-grad-cta py-3.5 text-sm font-bold text-white shadow-glow-cta active:scale-[0.98] transition"
            >
              🎟️ 지금 모습 생성하기
              {ticketsRemaining > 0 && (
                <span className="ml-2 text-white/70 text-xs">({ticketsRemaining}장 남음)</span>
              )}
            </button>
            {errorMessage && (
              <p className="mt-2 text-center text-xs text-yellow">{errorMessage}</p>
            )}
          </div>
        )}
      </div>

      {/* EVOLUTION HISTORY — open by default, horizontal swipe */}
      <div className="px-5 mt-4 mb-4">
        <p className="text-xs font-semibold text-secondary mb-3">나의 변화 히스토리</p>
        <div className="no-scrollbar flex items-start gap-3 overflow-x-auto pb-1">
          {mockEvolutionHistory.map((e, i) => (
            <div key={e.id} className="flex items-center gap-3 shrink-0">
              <ArchetypeCard
                src={CHARACTERS[e.characterId].src}
                name={e.archetypeName}
                date={e.date}
                size="lg"
              />
              {i < mockEvolutionHistory.length - 1 && (
                <span className="text-tertiary text-base shrink-0 mt-[-24px]">→</span>
              )}
            </div>
          ))}
          {/* current — active state with live archetype name */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-tertiary text-base shrink-0 mt-[-24px]">→</span>
            <ArchetypeCard
              src={evolutionSrc}
              name={archetype.name_ko}
              active
              size="lg"
            />
          </div>
        </div>
      </div>

      {/* level / EXP / keywords */}
      <div className="px-5 mb-4">
        <div className="flex items-center gap-3 mb-3">
          <Badge tone="pink">Lv.{mockProfile.level}</Badge>
          <span className="text-xs text-secondary">1,250 / 2,000 EXP</span>
          <ProgressBar value={62.5} tone="cta" height="h-1.5" className="flex-1 max-w-[120px]" />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {KEYWORDS.map((k) => (
            <span key={k} className="rounded-full bg-purple/10 border border-purple/20 px-2.5 py-1 text-xs font-semibold text-purple">
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
              {["6/3","6/4","6/5","6/6","6/7","6/8","오늘"].map((d) => <span key={d}>{d}</span>)}
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
              <button key={s} className="w-full flex items-center justify-between py-2.5 text-sm text-primary border-b border-border/30 last:border-0">
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
