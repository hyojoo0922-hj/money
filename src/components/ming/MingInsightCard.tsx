import { MingGuide } from "./MingGuide";
import type { MingKey } from "@/lib/assets";
interface Props { emotion?: MingKey; message: string; title?: string; ai?: boolean; }
export function MingInsightCard({ emotion = "chat", message, title, ai }: Props) {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-card border border-border p-4 shadow-glow-card">
      <MingGuide emotion={emotion} size="md" float />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          {title && <p className="text-xs font-bold text-purple">{title}</p>}
          {ai && <span className="text-[10px] bg-purple/20 text-purple border border-purple/30 rounded-full px-2 py-0.5 font-bold">AI</span>}
        </div>
        <p className="text-sm leading-relaxed text-primary">{message}</p>
      </div>
    </div>
  );
}
