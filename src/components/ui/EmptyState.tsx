import { BRAND } from "@/lib/assets";
/** Empty states use the official Bubble Girl brand character (allowed usage). */
export function EmptyState({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
      <img src={BRAND.bubbleGirl} alt="" className="h-32 w-32 rounded-xl object-cover" />
      <p className="text-base font-bold text-primary">{title}</p>
      {hint && <p className="max-w-[240px] text-sm text-secondary">{hint}</p>}
    </div>
  );
}
