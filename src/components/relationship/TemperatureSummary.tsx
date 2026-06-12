import { MingGuide } from "@/components/ming/MingGuide";
export function TemperatureSummary({ label, insight }: { label: string; insight: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-purple/10 border border-purple/20 p-4">
      <MingGuide emotion="coach" size="sm" />
      <div>
        <p className="text-sm font-bold text-purple">{label}</p>
        <p className="mt-0.5 text-sm text-secondary leading-relaxed">{insight}</p>
      </div>
    </div>
  );
}
