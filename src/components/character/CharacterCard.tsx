import { CHARACTERS, type CharacterId } from "@/lib/assets";
import { cn } from "@/lib/cn";

interface Props {
  id: CharacterId;
  selected?: boolean;
  onSelect?: (id: CharacterId) => void;
  size?: "sm" | "md" | "lg";
  name?: string;
  level?: number;
  overlay?: boolean; // dark gradient overlay to handle white-bg portraits
}

export function CharacterCard({ id, selected, onSelect, size = "md", name, level, overlay = true }: Props) {
  const c = CHARACTERS[id];
  const interactive = !!onSelect;
  return (
    <button
      type="button"
      disabled={!interactive}
      onClick={() => onSelect?.(id)}
      className={cn(
        "group relative w-full overflow-hidden rounded-lg bg-card transition-all duration-200",
        size === "sm" && "aspect-square",
        size !== "sm" && "aspect-[3/4]",
        interactive && "active:scale-[0.97]",
        selected ? "ring-pink-neon" : "border border-border",
      )}
      aria-pressed={selected}
    >
      {/* White-bg portrait: darken the base with a subtle gradient mat */}
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E0B16] via-transparent to-transparent opacity-60 z-10 pointer-events-none" />
      )}
      <img src={c.src} alt={name ?? id} className="h-full w-full object-cover object-top" />
      {(name || level) && (
        <div className="absolute inset-x-0 bottom-0 z-20 px-2 py-2">
          {level && <p className="text-[10px] text-pink font-bold">Lv.{level}</p>}
          {name && <p className="text-xs font-bold text-primary truncate">{name}</p>}
        </div>
      )}
      {selected && (
        <span className="absolute right-1.5 top-1.5 z-30 flex h-6 w-6 items-center justify-center rounded-full bg-pink text-xs text-white shadow-glow-pink">✓</span>
      )}
    </button>
  );
}
