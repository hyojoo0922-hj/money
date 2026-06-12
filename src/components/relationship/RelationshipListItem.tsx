import { Link } from "react-router-dom";
import { CHARACTERS } from "@/lib/assets";
import { Badge } from "@/components/ui/Badge";
import { Sparkline } from "@/components/ui/Sparkline";
import { cn } from "@/lib/cn";
import type { RelationshipItem } from "@/data/mock";

const mockSparkValues: Record<string, number[]> = {
  r1: [60,65,68,72,74,77,80],
  r2: [75,72,68,65,63,61,60],
  r3: [30,32,35,38,40,42,45],
};

export function RelationshipListItem({ r, best }: { r: RelationshipItem; best?: boolean }) {
  const sparkData = mockSparkValues[r.id] ?? [50,52,54,55,56,57,58];
  const delta = sparkData[sparkData.length - 1] - sparkData[0];
  return (
    <Link
      to={`/relationships/${r.id}`}
      className={cn(
        "flex items-center gap-3 rounded-xl p-3 transition-all duration-200 active:scale-[0.98]",
        best ? "bg-card border border-pink/40 shadow-glow-pink" : "bg-card border border-border"
      )}
    >
      <div className="relative shrink-0">
        <div className="h-14 w-14 overflow-hidden rounded-lg bg-white ring-1 ring-border">
          <img src={CHARACTERS[r.characterId].src} alt="" className="h-full w-full object-contain object-top" />
        </div>
        {best && <span className="absolute -top-1 -right-1 text-[11px]">✨</span>}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="font-bold text-primary truncate">{r.name}</p>
          {best && <Badge tone="pink">베스트 케미</Badge>}
          {r.chatUnlocked && <Badge tone="green">대화 가능</Badge>}
        </div>
        <p className="text-xs text-pink font-semibold">{r.levelLabel}</p>
        <div className="flex items-center gap-1 mt-0.5">
          <span className="text-pink text-xs">♥</span>
          <span className="text-sm font-bold text-primary">{sparkData[sparkData.length - 1]}%</span>
          <span className="text-xs text-secondary ml-1">{r.type === "cyber" ? "사이버" : "친구"}</span>
        </div>
      </div>
      <div className="shrink-0 flex flex-col items-end gap-1">
        <span className={cn("text-xs font-bold rounded-full px-2 py-0.5", delta >= 0 ? "bg-green/15 text-green" : "bg-pink/15 text-pink")}>
          {delta >= 0 ? "↑" : "↓"} {Math.abs(delta)}
        </span>
        <Sparkline values={sparkData} width={70} height={26} color={delta >= 0 ? "#00E5A8" : "#FF4FDB"} />
      </div>
    </Link>
  );
}
