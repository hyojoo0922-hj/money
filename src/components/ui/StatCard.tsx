import { cn } from "@/lib/cn";
/** Small metric tile used in summary grids (profile DNA, relationship summary). */
interface Props {
  emoji: string;
  label: string;
  value: string | number;
  delta?: string;
  tone?: "pink" | "purple" | "yellow" | "blue" | "green";
  className?: string;
}
const toneBar: Record<string, string> = {
  pink: "bg-pink", purple: "bg-grad-cool", yellow: "bg-yellow",
  blue: "bg-blue", green: "bg-green",
};
export function StatCard({ emoji, label, value, delta, tone = "pink", className }: Props) {
  return (
    <div className={cn("card-border rounded-lg p-3 flex flex-col gap-1", className)}>
      <div className="flex items-center justify-between">
        <span className="text-base">{emoji}</span>
        {delta && <span className="text-[11px] font-semibold text-green">{delta}</span>}
      </div>
      <p className="text-[22px] font-extrabold text-primary leading-none">{value}</p>
      <div className={cn("h-1 w-10 rounded-full", toneBar[tone])} />
      <p className="text-[11px] text-secondary">{label}</p>
    </div>
  );
}
