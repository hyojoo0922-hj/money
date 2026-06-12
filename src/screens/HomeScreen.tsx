import { Link } from "react-router-dom";
import { MingGuide } from "@/components/ming/MingGuide";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { CHARACTERS, BRAND } from "@/lib/assets";
import { mockProfile, mockRecommendations, mockDailyCards } from "@/data/mock";

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

      {/* hero — action-first */}
      <div
        className="mx-5 mb-4 relative overflow-hidden rounded-xl border border-purple/30 p-5"
        style={{ background: "linear-gradient(135deg, #2D1B6E 0%, #1A0E3D 60%, #0E0B16 100%)" }}
      >
        <div className="relative z-10 max-w-[60%]">
          {/* what should I do today */}
          <p className="text-xs font-semibold text-purple mb-1">오늘 뭘 할까?</p>
          <p className="text-lg font-extrabold text-primary leading-snug">
            {unanswered > 0
              ? `상황카드 ${unanswered}개가 기다리고 있어`
              : "오늘 카드를 모두 풀었어 🎉"}
          </p>
          {/* supporting chemistry metric */}
          <div className="mt-2 flex items-center gap-2">
            <span className="text-2xl font-black text-grad-cta">88%</span>
            <div>
              <p className="text-[11px] text-secondary leading-none">케미 포인트</p>
              <p className="text-[11px] text-green font-semibold">↑ 6% 어제보다</p>
            </div>
          </div>
          <ProgressBar value={88} tone="cta" height="h-1.5" className="mt-2 max-w-[130px]" />
          {/* MING emotional hook */}
          <div className="mt-3 flex items-center gap-2">
            <MingGuide emotion="pointing" size="xs" />
            <p className="text-xs text-secondary leading-snug">
              '답장망상가' 성향이 살짝 올라갔어
            </p>
          </div>
        </div>
        <img
          src={BRAND.bubbleGirl}
          alt=""
          className="absolute bottom-0 right-0 h-[160px] w-auto object-contain object-bottom pointer-events-none"
        />
      </div>

      {/* primary CTA — single clear action */}
      {unanswered > 0 ? (
        <Link
          to="/situations"
          className="mx-5 mb-5 flex items-center gap-3 rounded-xl bg-grad-cta p-4 shadow-glow-cta active:scale-[0.98] transition"
        >
          <span className="text-2xl">🎴</span>
          <div className="flex-1">
            <p className="text-sm font-bold text-white">상황카드 답하기</p>
            <p className="text-xs text-white/70">답할수록 관계가 가까워져</p>
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

      {/* recommended relationships carousel */}
      <div className="mb-5">
        <div className="flex items-center justify-between px-5 mb-3">
          <h2 className="text-sm font-extrabold text-primary">연결해볼 사람</h2>
          <Link to="/relationships" className="text-xs font-semibold text-purple">더보기 ›</Link>
        </div>
        <div className="no-scrollbar flex gap-3 overflow-x-auto pl-5 pr-3">
          {mockRecommendations.map((rec) => (
            <Link
              key={rec.id}
              to="/relationships"
              className="shrink-0 w-[150px] rounded-xl bg-card border border-border overflow-hidden active:scale-[0.97] transition"
            >
              <div className="relative h-[140px] bg-white">
                <div className="absolute top-2 left-2 z-10">
                  <Badge tone="pink">추천</Badge>
                </div>
                <div className="absolute top-2 right-2 z-10 flex items-center gap-0.5 rounded-full bg-black/50 px-2 py-0.5">
                  <span className="text-pink text-xs">♥</span>
                  <span className="text-xs font-bold text-white">91%</span>
                </div>
                <img
                  src={CHARACTERS[rec.characterId].src}
                  alt=""
                  className="h-full w-full object-contain object-top"
                />
              </div>
              <div className="p-2.5">
                <p className="font-bold text-primary text-sm">{rec.name}</p>
                <p className="text-[11px] text-secondary mt-0.5 leading-tight">{rec.reason}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

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
