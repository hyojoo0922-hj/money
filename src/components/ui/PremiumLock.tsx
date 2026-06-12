import { Badge } from "./Badge";
export function PremiumLabel({ label = "프리미엄" }: { label?: string }) {
  return <Badge tone="yellow">💎 {label}</Badge>;
}
