import { useState } from "react";
import { Link } from "react-router-dom";
import { RelationshipListItem } from "@/components/relationship/RelationshipListItem";
import { EmptyState } from "@/components/ui/EmptyState";
import { cn } from "@/lib/cn";
import { CHARACTERS } from "@/lib/assets";
import { mockRelationships } from "@/data/mock";

const TYPE_TABS = ["전체", "썸/연인", "친구", "가족", "직장"] as const;

export default function RelationshipsScreen() {
  const [tab, setTab] = useState("전체");

  // mock: top relationship today (guard: list may be empty)
  const topToday = mockRelationships[0];

  const list =
    tab === "전체"
      ? mockRelationships
      : mockRelationships.filter((r) => {
          if (tab === "친구") return r.type === "real";
          if (tab === "썸/연인") return r.type === "cyber";
          return false;
        });

  return (
    <div className="pb-4">
      {/* top bar */}
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <h1 className="text-lg font-extrabold text-primary">관계</h1>
        <button
          type="button"
          disabled
          title="곧 만날 수 있어요"
          className="flex items-center gap-1.5 rounded-full bg-card border border-border px-4 py-2 text-sm font-bold text-tertiary cursor-not-allowed"
        >
          + 추가 · 준비 중
        </button>
      </div>

      {/* 오늘 가장 가까워진 사람 */}
      {topToday && (
        <div className="px-5 mb-4">
          <p className="text-xs font-semibold text-secondary mb-2">오늘 가장 가까워진 사람</p>
          <Link
            to={`/relationships/${topToday.id}`}
            className="flex items-center gap-3 rounded-xl bg-card border border-pink/30 shadow-glow-pink p-3 active:scale-[0.98] transition"
          >
            <div className="h-16 w-16 overflow-hidden rounded-xl bg-gradient-to-b from-[#1A1235] to-[#0E0B16] ring-pink-neon shrink-0">
              <img
                src={CHARACTERS[topToday.characterId].src}
                alt={topToday.name}
                className="h-full w-full object-contain object-top"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-bold text-primary">{topToday.name}</p>
                <span className="text-[10px] rounded-full bg-pink/15 text-pink border border-pink/20 px-2 py-0.5 font-semibold">
                  가까워지는 중
                </span>
              </div>
              <p className="text-xs text-secondary mt-0.5 leading-snug">{topToday.insight}</p>
            </div>
            <span className="text-secondary shrink-0">›</span>
          </Link>
        </div>
      )}

      {/* type filter chips */}
      <div className="no-scrollbar flex gap-2 overflow-x-auto px-5 mb-4">
        {TYPE_TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold transition whitespace-nowrap",
              tab === t
                ? "bg-grad-cta text-white shadow-glow-pink"
                : "bg-card border border-border text-secondary",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {/* relationship list */}
      <div className="space-y-2 px-5">
        {list.length ? (
          list.map((r, i) => (
            <RelationshipListItem key={r.id} r={r} best={i === 0} />
          ))
        ) : (
          <EmptyState title="아직 관계가 없어" hint="관계 추가 기능은 곧 만날 수 있어." />
        )}
      </div>
    </div>
  );
}
