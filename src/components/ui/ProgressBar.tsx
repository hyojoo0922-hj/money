import { cn } from "@/lib/cn";

interface Props {
  value: number; // 0..100
  tone?: "cta" | "cool" | "warm" | "green" | "blue" | "pink";
  height?: string;
  className?: string;
}

const fills: Record<NonNullable<Props["tone"]>, string> = {
  cta:   "bg-grad-cta",
  cool:  "bg-grad-cool",
  warm:  "bg-grad-warm",
  green: "bg-green",
  blue:  "bg-blue",
  pink:  "bg-pink",
};

export function ProgressBar({ value, tone = "cta", height = "h-2", className }: Props) {
  return (
    <div className={cn("w-full overflow-hidden rounded-full bg-border", height, className)}>
      <div
        className={cn("h-full rounded-full transition-all duration-500", fills[tone])}
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
}
