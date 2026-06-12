import { CHARACTERS, type CharacterId } from "@/lib/assets";
import { cn } from "@/lib/cn";

interface Props {
  id: CharacterId;
  selected?: boolean;
  onSelect?: (id: CharacterId) => void;
  size?: "sm" | "md" | "lg";
  name?: string;
  level?: number;
}

export function CharacterCard({
  id,
  selected,
  onSelect,
  size = "md",
  name,
  level,
}: Props) {
  const c = CHARACTERS[id];
  const interactive = !!onSelect;
  return (
    <button
      type="button"
      disabled={!interactive}
      onClick={() => onSelect?.(id)}
      className={cn(
        "group relative w-full overflow-hidden rounded-lg bg-white transition-all duration-200",
        size === "sm" ? "aspect-square" : "aspect-[3/4]",
        interactive && "active:scale-[0.97]",
        selected ? "ring-pink-neon" : "border border-border",
      )}
      aria-pressed={selected}
    >
      <img
        src={c.src}
        alt={name ?? id}
        className="h-full w-full object-contain object-top"
      />
      <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#0E0B16]/60 to-transparent pointer-events-none" />
      {(name || level) && (
        <div className="absolute inset-x-0 bottom-0 z-10 px-2 py-1.5">
          {level !== undefined && (
            <p className="text-[10px] text-pink font-bold">Lv.{level}</p>
          )}
          {name && (
            <p className="text-xs font-bold text-primary truncate">{name}</p>
          )}
        </div>
      )}
      {selected && (
        <span className="absolute right-1.5 top-1.5 z-20 flex h-6 w-6 items-center justify-center rounded-full bg-pink text-xs text-white shadow-glow-pink">
          ✓
        </span>
      )}
    </button>
  );
}
