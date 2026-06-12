import { MING, type MingKey } from "@/lib/assets";
import { cn } from "@/lib/cn";

const sizeMap = {
  xs: "h-8 w-8",
  sm: "h-14 w-14",
  md: "h-20 w-20",
  lg: "h-32 w-32",
  xl: "h-40 w-40",
};

interface Props {
  emotion?: MingKey;
  size?: keyof typeof sizeMap;
  float?: boolean;
  className?: string;
  alt?: string;
}

export function MingGuide({
  emotion = "base",
  size = "md",
  float,
  className,
  alt = "MING",
}: Props) {
  return (
    <img
      src={MING[emotion]}
      alt={alt}
      className={cn(
        sizeMap[size],
        "object-contain drop-shadow-[0_4px_16px_rgba(123,97,255,0.45)]",
        float && "animate-floaty",
        className,
      )}
    />
  );
}
