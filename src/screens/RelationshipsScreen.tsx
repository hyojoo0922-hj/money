import { useState } from "react";
import { Link } from "react-router-dom";
import { RelationshipListItem } from "@/components/relationship/RelationshipListItem";
import { EmptyState } from "@/components/ui/EmptyState";
import { cn } from "@/lib/cn";
import { mockRelationships } from "@/data/mock";

const TYPE_TABS = ["전체", "썸/연인", "친구", "가족", "직장"] as const;

export default function RelationshipsScreen() {
  const [tab, setTab] = useState("전체");

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
        <Link
          to="/relationships/new"
          className="flex items-center gap-1.5 rounded-full bg-grad-cta px-4 py-2 text-sm font-bold text-white shadow-glow-pink"
        >
          + 추가
        </Link>
      </div>

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

      {/* relationship list — primary content */}
      <div className="space-y-2 px-5">
        {list.length ? (
          list.map((r, i) => (
            <RelationshipListItem key={r.id} r={r} best={i === 0} />
          ))
        ) : (
          <EmptyState title="아직 관계가 없어" hint="새 관계를 추가해봐." />
        )}
      </div>
    </div>
  );
}
