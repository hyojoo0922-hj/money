import { charactersByGender, type CharacterId, type Gender } from "@/lib/assets";
import { CharacterCard } from "./CharacterCard";
interface Props { gender: Gender; value?: CharacterId; recommended?: CharacterId; onChange: (id: CharacterId) => void; }
export function CharacterPicker({ gender, value, recommended, onChange }: Props) {
  const ids = charactersByGender(gender);
  return (
    <div className="grid grid-cols-3 gap-3">
      {ids.map((id) => (
        <div key={id} className="relative">
          {recommended === id && (
            <span className="absolute -top-2 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-grad-cta px-2 py-0.5 text-[10px] font-bold text-white shadow-glow-pink">
              MING 추천
            </span>
          )}
          <CharacterCard id={id} selected={value === id} onSelect={onChange} size="sm" />
        </div>
      ))}
    </div>
  );
}
