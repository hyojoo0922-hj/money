/**
 * ArchetypeCard — shared archetype image container.
 * AI-asset ready: object-contain, transparent PNG safe, no face clipping.
 * When OpenAI-generated archetype images ship, swap src — layout unchanged.
 */
import { cn } from "@/lib/cn";

interface Props {
  src:        string;
  name:       string;
  date?:      string;
  active?:    boolean;
  size?:      "sm" | "md" | "lg";
  className?: string;
  onClick?:   () => void;
}

const sizes = {
  sm:  { card: "w-[88px]",  img: "h-[117px]" },
  md:  { card: "w-[110px]", img: "h-[147px]" },
  lg:  { card: "w-[140px]", img: "h-[187px]" },
};

export function ArchetypeCard({ src, name, date, active, size = "md", className, onClick }: Props) {
  const s = sizes[size];
  return (
    <div
      className={cn("shrink-0 flex flex-col items-center gap-1.5", s.card, className)}
      onClick={onClick}
      role={onClick ? "button" : undefined}
    >
      <div
        className={cn(
          "w-full overflow-hidden rounded-xl",
          s.img,
          "bg-gradient-to-b from-[#1A1235] to-[#0E0B16]",
          active
            ? "ring-2 ring-pink shadow-glow-pink"
            : "ring-1 ring-border",
        )}
      >
        <img
          src={src}
          alt={name}
          className="h-full w-full object-contain object-top"
          draggable={false}
        />
      </div>

      <p className={cn(
        "text-center leading-tight font-bold",
        size === "sm" ? "text-[10px]" : "text-[11px]",
        active ? "text-pink" : "text-primary",
      )}>
        {name}
      </p>

      {(date || active) && (
        <p className={cn(
          "text-[9px] text-center",
          active ? "text-pink" : "text-tertiary",
        )}>
          {active ? "지금" : date}
        </p>
      )}
    </div>
  );
}
