import { useState } from "react";
import { Link } from "react-router-dom";
import { TopBar } from "@/components/layout/TopBar";
import { RelationshipListItem } from "@/components/relationship/RelationshipListItem";
import { MingInsightCard } from "@/components/ming/MingInsightCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { StatCard } from "@/components/ui/StatCard";
import { BRAND } from "@/lib/assets";
import { cn } from "@/lib/cn";
import { mockRelationships } from "@/data/mock";

const TYPE_TABS = ["전체", "썸/연인", "친구", "가족", "직장", "기타"] as const;

export default function RelationshipsScreen() {
  const [tab, setTab] = useState("전체");
  const list = tab === "전체" ? mockRelationships : mockRelationships.filter((r) => {
    if (tab === "친구") return r.type === "real";
    if (tab === "썸/연인") return r.type === "cyber";
    return false;
  });
  return (
    <div className="pb-6">
      {/* top bar */}
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-extrabold text-primary">관계</h1>
          <button className="flex h-6 w-6 items-center justify-center rounded-full bg-card border border-border text-xs text-secondary">ℹ</button>
        </div>
        <div className="flex items-center gap-2">
          <button className="relative flex h-9 w-9 items-center justify-center rounded-full bg-card border border-border">
            <span className="text-base">🔔</span>
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-pink" />
          </button>
          <Link to="/relationships/new" className="flex h-9 w-9 items-center justify-center rounded-full bg-grad-cta text-white shadow-glow-pink text-xl">+</Link>
        </div>
      </div>

      {/* MING 한마디 with brand character */}
      <div className="mx-5 mb-4 relative flex items-center gap-3 rounded-xl bg-card border border-purple/30 p-4 overflow-hidden">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-primary">오늘의 MING 한마디 💜</p>
          <p className="text-sm text-secondary mt-1 leading-relaxed">관계는 노력하는 만큼, 더 좋은 방향으로 자라나요.</p>
        </div>
        <img src={BRAND.bubbleGirl} alt="" className="h-20 w-20 object-contain shrink-0" />
      </div>

      {/* summary stats */}
      <div className="mx-5 mb-4">
        <p className="text-sm font-bold text-primary mb-2">내 관계 한눈에 보기</p>
        <div className="grid grid-cols-3 gap-2">
          <StatCard emoji="♥" label="전체 관계 수" value={`${mockRelationships.length}사람`} tone="pink" />
          <StatCard emoji="★" label="베스트 케미" value="87%" delta="서준" tone="yellow" />
          <StatCard emoji="🔥" label="현재 관계 온도" value="72" delta="↑ 6" tone="purple" />
        </div>
      </div>

      {/* type filter chips */}
      <div className="no-scrollbar flex gap-2 overflow-x-auto px-5 mb-4">
        {TYPE_TABS.map((t, i) => (
          <button key={t} onClick={() => setTab(t)}
            className={cn(
              "shrink-0 rounded-full px-3 py-1.5 text-sm font-semibold transition",
              tab === t
                ? "bg-grad-cta text-white shadow-glow-pink"
                : "bg-card border border-border text-secondary"
            )}>
            {t} {i === 0 ? mockRelationships.length : i === 2 ? 4 : i === 1 ? 2 : ""}
          </button>
        ))}
      </div>

      {/* relationship list */}
      <div className="space-y-2 px-5">
        {list.length
          ? list.map((r, i) => <RelationshipListItem key={r.id} r={r} best={i === 0} />)
          : <EmptyState title="아직 관계가 없어" hint="새 관계를 추가해봐." />
        }
      </div>

      {/* add CTA */}
      <div className="mx-5 mt-4 flex items-center gap-3 rounded-xl bg-card border border-border p-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple/20 text-2xl shrink-0">🃏</div>
        <div className="flex-1">
          <p className="text-sm font-bold text-primary">새로운 관계 만들기</p>
          <p className="text-xs text-secondary">아는 사람을 추가하고 관계를 분석해보세요.</p>
        </div>
        <button className="shrink-0 rounded-full bg-grad-cta px-4 py-2 text-sm font-bold text-white shadow-glow-pink">관계 추가</button>
      </div>
    </div>
  );
}
