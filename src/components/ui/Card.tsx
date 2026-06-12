import { Link } from "react-router-dom";
import { MingGuide } from "@/components/ming/MingGuide";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";
import { CHARACTERS } from "@/lib/assets";
import { mockProfile, mockPrimaryArchetype, mockDailyCards, mockRecommendations } from "@/data/mock";

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

      {/* TODAY'S ME — archetype image dominates */}
      <div
        className="mx-5 mb-4 relative overflow-hidden rounded-xl border border-purple/30"
        style={{
          background: "linear-gradient(135deg, #2D1B6E 0%, #1A0E3D 60%, #0E0B16 100%)",
          minHeight: "220px",
        }}
      >
        {/* left: text */}
        <div className="relative z-10 p-5" style={{ maxWidth: "54%" }}>
          <p className="text-xs font-semibold text-purple mb-2">오늘의 나</p>
          <p className="text-2xl font-black text-grad-cta leading-tight">
            {mockPrimaryArchetype.emoji} {mockPrimaryArchetype.name_ko}
          </p>
          <p className="text-xs text-secondary mt-1.5 leading-snug">
            답장이 늦으면 머릿속이 바빠지는 사람
          </p>
          <div className="mt-3 flex items-center gap-2">
            <span className="text-sm font-bold text-primary">케미 88%</span>
            <span className="text-xs text-green font-semibold">↑ 6%</span>
          </div>
          <ProgressBar value={88} tone="cta" height="h-1" className="mt-1.5" />
          <div className="mt-3 flex items-center gap-2">
            <MingGuide emotion="pointing" size="xs" />
            <p className="text-xs text-secondary leading-snug">최근 성향이 조금 바뀌었어</p>
          </div>
        </div>

        {/* right: character portrait — dominant anchor */}
        <div className="absolute bottom-0 right-0 top-0 flex items-end justify-end pr-2">
          <img
            src={CHARACTERS[mockProfile.characterId].src}
            alt={mockPrimaryArchetype.name_ko}
            className="object-contain object-bottom"
            style={{ height: "210px", width: "auto", maxWidth: "170px" }}
            draggable={false}
          />
        </div>
      </div>

      {/* ONE primary CTA */}
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

      {/* 연결해볼 사람 — recommendation carousel */}
      <div className="mb-2">
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
              <div className="relative h-[140px] bg-gradient-to-b from-[#1A1235] to-[#0E0B16]">
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
    </div>
  );
}
