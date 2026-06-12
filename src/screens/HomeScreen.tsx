import { Link } from "react-router-dom";
import { MingGuide } from "@/components/ming/MingGuide";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { CHARACTERS } from "@/lib/assets";
import { mockProfile, mockPrimaryArchetype, mockDailyCards } from "@/data/mock";

const quickActions = [
  { to: "/situations",    emoji: "🎴", label: "상황카드",  color: "bg-purple/80" },
  { to: "/relationships", emoji: "💞", label: "관계 보기", color: "bg-pink/80"   },
  { to: "/report",        emoji: "📊", label: "리포트",   color: "bg-blue/80"   },
  { to: "/profile",       emoji: "✨", label: "내 성향",  color: "bg-yellow/80" },
];

export default function HomeScreen() {
  const unanswered = mockDailyCards.filter((c) => !c.answered).length;

  return (
    <div className="pb-4">
      {/* top bar */}
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <span className="text-xl font-extrabold tracking-tight text-primary">MINGLEY</span>
        <button className="relative flex h-9 w-9 items-center justify-center rounded-full bg-card border border-border">
          <span className="text-base">🔔</span>
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-pink" />
        </button>
      </div>

      {/* TODAY'S ME — character evolution hero */}
      <div
        className="mx-5 mb-4 relative overflow-hidden rounded-xl border border-purple/30"
        style={{ background: "linear-gradient(135deg, #2D1B6E 0%, #1A0E3D 60%, #0E0B16 100%)", minHeight: "200px" }}
      >
        {/* text left */}
        <div className="relative z-10 p-5 max-w-[58%]">
          <p className="text-xs font-semibold text-purple mb-2">오늘의 나</p>
          {/* archetype as title */}
          <p className="text-2xl font-black text-grad-cta leading-tight">
            {mockPrimaryArchetype.emoji} {mockPrimaryArchetype.name_ko}
          </p>
          <p className="text-xs text-secondary mt-1.5 leading-snug">
            답장이 늦으면 머릿속이 바빠지는 사람
          </p>
          {/* chemistry as supporting line */}
          <div className="mt-3 flex items-center gap-2">
            <span className="text-sm font-bold text-primary">케미 88%</span>
            <span className="text-xs text-green">↑ 6%</span>
          </div>
          <ProgressBar value={88} tone="cta" height="h-1" className="mt-1.5 max-w-[120px]" />
          {/* MING tip */}
          <div className="mt-3 flex items-center gap-2">
            <MingGuide emotion="pointing" size="xs" />
            <p className="text-xs text-secondary leading-snug">최근 성향이 조금 바뀌었어</p>
          </div>
        </div>

        {/* character portrait — dominant right anchor */}
        <div className="absolute bottom-0 right-0 h-full flex items-end">
          <img
            src={CHARACTERS[mockProfile.characterId].src}
            alt="오늘의 나"
            className="h-[190px] w-auto object-contain object-bottom"
            style={{ maxWidth: "160px" }}
          />
        </div>
      </div>

      {/* primary CTA */}
      {unanswered > 0 ? (
        <Link
          to="/situations"
          className="mx-5 mb-5 flex items-center gap-3 rounded-xl bg-grad-cta p-4 shadow-glow-cta active:scale-[0.98] transition"
        >
          <span className="text-2xl">🎴</span>
          <div className="flex-1">
            <p className="text-sm font-bold text-white">상황카드 답하기</p>
            <p className="text-xs text-white/70">답할수록 내 모습이 선명해져</p>
          </div>
          <span className="text-white/80 text-lg">›</span>
        </Link>
      ) : (
        <Link
          to="/relationships"
          className="mx-5 mb-5 flex items-center gap-3 rounded-xl bg-card border border-border p-4 active:scale-[0.98] transition"
        >
          <span className="text-2xl">💞</span>
          <div className="flex-1">
            <p className="text-sm font-bold text-primary">관계 살펴보기</p>
            <p className="text-xs text-secondary">가까워진 사람이 있는지 확인해봐</p>
          </div>
          <span className="text-secondary text-lg">›</span>
        </Link>
      )}

      {/* quick actions */}
      <div className="px-5">
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map((a) => (
            <Link
              key={a.label}
              to={a.to}
              className="flex flex-col items-center gap-1.5 active:scale-[0.95] transition"
            >
              <div className={`h-12 w-12 rounded-xl ${a.color} flex items-center justify-center text-xl`}>
                {a.emoji}
              </div>
              <p className="text-[11px] font-semibold text-secondary text-center leading-tight">{a.label}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
