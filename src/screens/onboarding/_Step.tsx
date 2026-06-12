import { ProgressBar } from "@/components/ui/ProgressBar";
export function OnbStep({ step, total, children }: { step: number; total: number; children: React.ReactNode }) {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-bg px-6 pb-8 pt-12">
      <div className="mx-auto w-full max-w-[480px]">
        <ProgressBar value={(step / total) * 100} tone="cta" height="h-1.5" />
        <p className="mt-2 text-xs text-tertiary">{step} / {total}</p>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}
