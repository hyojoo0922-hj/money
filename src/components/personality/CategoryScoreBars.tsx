import { ProgressBar } from "@/components/ui/ProgressBar";
import type { CategoryScore } from "@/data/mock";

const tones = ["pink", "blue", "green", "cta", "cool", "pink", "blue", "green"] as const;

export function CategoryScoreBars({ scores }: { scores: CategoryScore[] }) {
  return (
    <div className="space-y-3">
      {scores.map((s, i) => (
        <div key={s.key}>
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="font-semibold text-primary">{s.name_ko}</span>
            <span className="tabular-nums font-bold text-pink">{s.score}</span>
          </div>
          <ProgressBar value={s.score} tone={tones[i % tones.length]} />
        </div>
      ))}
    </div>
  );
}
