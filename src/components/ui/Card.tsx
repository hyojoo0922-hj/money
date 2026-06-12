import { cn } from "@/lib/cn";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  glow?: "pink" | "purple" | false;
  variant?: "default" | "hero" | "flat";
}

export function Card({ glow, variant = "default", className, ...rest }: Props) {
  return (
    <div
      className={cn(
        "card-border rounded-lg",
        variant === "hero"    && "rounded-xl p-5",
        variant === "default" && "rounded-lg p-4",
        variant === "flat"    && "rounded-lg p-4 border-0 bg-bg",
        glow === "pink"   && "shadow-glow-pink",
        glow === "purple" && "shadow-glow-purple",
        className,
      )}
      {...rest}
    />
  );
}
