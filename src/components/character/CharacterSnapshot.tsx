import { CHARACTERS, type CharacterId } from "@/lib/assets";
import { ProgressBar } from "@/components/ui/ProgressBar";
interface Props { id: CharacterId; archetypeName: string; level?: number; exp?: number; expMax?: number; accuracy?: number; }
export function CharacterSnapshot({ id, archetypeName, level = 12, exp = 1250, expMax = 2000, accuracy = 92 }: Props) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-hero-bg border border-border p-4">
      <div className="flex items-end gap-4">
        {/* character portrait with portrait compositing overlay */}
        <div className="relative shrink-0">
          <div className="h-28 w-28 rounded-lg overflow-hidden ring-pink-neon">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E0B16] via-transparent to-transparent opacity-50 z-10 pointer-events-none rounded-lg" />
            <img src={CHARACTERS[id].src} alt="내 캐릭터" className="h-full w-full object-cover object-top" />
          </div>
        </div>
        <div className="flex-1 pb-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-pink">Lv.{level}</span>
            <span className="text-xs text-secondary">{exp.toLocaleString()} / {expMax.toLocaleString()} EXP</span>
          </div>
          <ProgressBar value={(exp / expMax) * 100} tone="cta" height="h-1.5" className="mb-2" />
          <p className="text-lg font-extrabold text-primary truncate">{archetypeName}</p>
          <p className="text-xs text-secondary">캐릭터 정확도 {accuracy}% · 나답게 진화 중✨</p>
        </div>
        {/* accuracy donut hint */}
        <div className="shrink-0 text-right">
          <p className="text-2xl font-extrabold text-grad-cta">{accuracy}%</p>
          <p className="text-[10px] text-secondary">정확도</p>
        </div>
      </div>
    </div>
  );
}
