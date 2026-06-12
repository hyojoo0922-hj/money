import { cn } from "@/lib/cn";

type Tone = "pink" | "purple" | "yellow" | "blue" | "green" | "muted";

interface Props {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}

const tones: Record<Tone, string> = {
  pink:   "bg-pink/15   text-pink   border border-pink/30",
  purple: "bg-purple/15 text-purple border border-purple/30",
  yellow: "bg-yellow/15 text-yellow border border-yellow/30",
  blue:   "bg-blue/15   text-blue   border border-blue/30",
  green:  "bg-green/15  text-green  border border-green/30",
  muted:  "bg-border    text-secondary border border-border",
};

export function Badge({ children, tone = "purple", className }: Props) {
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold", tones[tone], className)}>
      {children}
    </span>
  );
}
