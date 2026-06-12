import type { Archetype } from "@/data/mock";
import { cn } from "@/lib/cn";
export function ArchetypeBadge({ a, primary }: { a: Archetype; primary?: boolean }) {
  return (
    <div className={cn(
      "flex items-center gap-2 rounded-full px-3 py-2 text-sm font-bold",
      primary
        ? "bg-grad-cta text-white shadow-glow-pink"
        : "bg-card border border-border text-primary"
    )}>
      <span className="text-base" aria-hidden>{a.emoji}</span>
      {a.name_ko}
    </div>
  );
}
