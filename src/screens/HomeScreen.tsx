import { Link } from "react-router-dom";
import { MingInsightCard } from "@/components/ming/MingInsightCard";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { CHARACTERS, BRAND } from "@/lib/assets";
import { mockProfile, mockRelationships, mockRecommendations, mockDailyCards } from "@/data/mock";

const quickActions = [
  { to: "/situations", emoji: "🎴", label: "상황카드", sub: "질문에 답하고\n나를 더 알아가요", color: "bg-purple/80" },
  { to: "/relationships", emoji: "👤", label: "친구 초대", sub: "더 많은 친구와\n함께하세요", color: "bg-pink/80" },
  { to: "/relationships", emoji: "💞", label: "관계 등록", sub: "새로운 관계를\n추가해보세요", color: "bg-yellow/80" },
  { to: "/report", emoji: "📊", label: "관계 리포트", sub: "우리 관계를\n분석해보세요", color: "bg-blue/80" },
];

const mockActivity = [
  { name: "서준", action: "'너라면' 카드에 답했어요!", time: "2시간 전" },
  { name: "유진", action: "새로운 질문에 답했어요!", time: "4시간 전" },
  { name: "민재", action: "프로필을 업데이트했어요.", time: "어제" },
  { name: null, action: "설렘 케미가 5% 상승했어요! ✨", time: "어제" },
];

export default function HomeScreen() {
  const unanswered = mockDailyCards.filter((c) => !c.answered).length;
  return (
    <div className="pb-6">
      {/* top bar */}
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <span className="text-xl font-extrabold tracking-tight text-primary">MINGLEY</span>
        <div className="flex items-center gap-2">
          <button className="relative flex h-9 w-9 items-center justify-center rounded-full bg-card border border-border">
            <span className="text-base">🔔</span>
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-pink" />
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-card border border-border">
            <span className="text-base">⚙️</span>
          </button>
        </div>
      </div>

      {/* hero chemistry card — using Bubble Girl as brand display (allowed) */}
      <div className="mx-5 mb-4 relative overflow-hidden rounded-xl bg-gradient-to-br from-[#2D1B6E] via-[#1A0E3D] to-[#0E0B16] border border-purple/30 p-5 min-h-[160px]">
        <div className="relative z-10 max-w-[55%]">
          <p className="text-sm text-secondary mb-1">안녕, {mockProfile.displayName}! 👋</p>
          <p className="text-sm font-semibold text-secondary">오늘의 케미 포인트</p>
          <p className="text-5xl font-black text-primary leading-none mt-1">88<span className="text-2xl">%</span></p>
          <ProgressBar value={88} tone="cta" height="h-2.5" className="mt-3 max-w-[150px]" />
          <div className="mt-2 flex items-center gap-1">
            <span className="text-[11px] font-bold text-green">+6%</span>
            <span className="text-[11px] text-secondary">어제보다 상승했어요!</span>
          </div>
        </div>
        {/* brand character */}
        <img
          src={BRAND.bubbleGirl}
          alt=""
          className="absolute bottom-0 right-0 h-[140px] w-auto object-contain object-bottom pointer-events-none"
        />
        {/* subtle sparkle decorations */}
        <span className="absolute right-24 top-4 text-xs text-pink opacity-70">✦</span>
        <span className="absolute right-16 top-10 text-[10px] text-purple opacity-60">★</span>
      </div>

      {/* new questions banner */}
      {unanswered > 0 && (
        <Link to="/situations" className="mx-5 mb-4 flex items-center gap-3 rounded-xl bg-card border border-border p-3 active:scale-[0.98] transition">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink/20">
            <span className="text-xl">✨</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-primary">새로운 질문이 {unanswered}개 도착했어요!</p>
            <p className="text-xs text-secondary">친구들에게 '너라면' 카드를 보내볼까요?</p>
          </div>
          <span className="text-secondary">›</span>
        </Link>
      )}

      {/* recommended relationships carousel */}
      <div className="mb-4">
        <div className="flex items-center justify-between px-5 mb-3">
          <h2 className="font-extrabold text-primary">오늘의 추천 관계</h2>
          <Link to="/relationships" className="text-xs font-semibold text-purple">더보기 ›</Link>
        </div>
        <div className="no-scrollbar flex gap-3 overflow-x-auto pl-5 pr-3">
          {mockRecommendations.map((rec) => (
            <Link key={rec.id} to="/relationships"
              className="shrink-0 w-[170px] rounded-xl bg-card border border-border overflow-hidden active:scale-[0.97] transition">
              <div className="relative h-[160px] bg-gradient-to-b from-purple/20 to-card">
                <div className="absolute top-2 left-2">
                  <Badge tone="pink">친구 추천</Badge>
                </div>
                <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-black/50 px-2 py-0.5">
                  <span className="text-pink text-xs">♥</span>
                  <span className="text-xs font-bold text-white">91%</span>
                </div>
                <img src={CHARACTERS[rec.characterId].src} alt="" className="absolute bottom-0 inset-x-0 h-[130px] w-full object-cover object-top" />
              </div>
              <div className="p-3">
                <p className="font-bold text-primary text-sm">{rec.name}</p>
                <p className="text-[11px] text-secondary">{rec.reason}</p>
                <button className="mt-2 w-full rounded-full border border-pink/50 py-1.5 text-xs font-semibold text-pink">
                  관계 미리보기
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* quick actions grid */}
      <div className="px-5 mb-4">
        <h2 className="font-extrabold text-primary mb-3">바로가기</h2>
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map((a) => (
            <Link key={a.label} to={a.to} className="flex flex-col items-center gap-1.5 active:scale-[0.95] transition">
              <div className={`h-14 w-14 rounded-xl ${a.color} flex items-center justify-center text-2xl shadow-glow-card`}>
                {a.emoji}
              </div>
              <p className="text-xs font-semibold text-primary text-center">{a.label}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* activity feed */}
      <div className="px-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-extrabold text-primary">최근 활동</h2>
          <button className="text-xs font-semibold text-purple">전체 보기 ›</button>
        </div>
        <div className="space-y-1">
          {mockActivity.map((a, i) => (
            <div key={i} className="flex items-center gap-3 rounded-lg p-3 hover:bg-card/60 transition">
              <div className="h-9 w-9 rounded-full bg-purple/20 flex items-center justify-center text-sm shrink-0">
                {a.name ? a.name[0] : "✨"}
              </div>
              <p className="flex-1 text-sm text-primary">
                {a.name && <span className="font-bold">{a.name}</span>} {a.action}
              </p>
              <span className="text-xs text-tertiary shrink-0">{a.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* MING tip at bottom */}
      <div className="mx-5 mt-4">
        <MingInsightCard emotion="pointing" title="MING의 한마디" message="요즘 '답장망상가' 성향이 올라가고 있어. 답장 안 오면 머릿속이 바빠지지?" />
      </div>
    </div>
  );
}
