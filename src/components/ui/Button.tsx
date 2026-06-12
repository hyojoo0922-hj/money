import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "tertiary" | "ghost" | "danger";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  full?: boolean;
  glow?: boolean;
}

const styles: Record<Variant, string> = {
  primary:   "bg-grad-cta text-white shadow-glow-cta hover:brightness-110 active:scale-[0.97]",
  secondary: "bg-card text-primary border border-border hover:border-purple/60 active:scale-[0.97]",
  tertiary:  "bg-transparent text-purple border border-purple/40 hover:bg-purple/10 active:scale-[0.97]",
  ghost:     "bg-transparent text-secondary hover:text-primary",
  danger:    "bg-transparent text-pink border border-pink/40 hover:bg-pink/10",
};

export function Button({ variant = "primary", full, glow, className, ...rest }: Props) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3",
        "text-[15px] font-semibold transition-all duration-200",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple",
        "disabled:opacity-40 disabled:pointer-events-none",
        styles[variant],
        glow && "shadow-glow-pink",
        full && "w-full",
        className,
      )}
      {...rest}
    />
  );
}
