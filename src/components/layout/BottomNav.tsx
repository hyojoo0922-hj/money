import { NavLink } from "react-router-dom";
import { cn } from "@/lib/cn";

// Navigation IA: 홈·상황카드·관계·리포트·마이 (per visual reference)
const tabs = [
  {
    to: "/",
    label: "홈",
    icon: (a: boolean) => (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill={a ? "currentColor" : "none"}
        stroke="currentColor" strokeWidth={a ? 0 : 1.8} strokeLinecap="round">
        <path d="M3 12L12 4l9 8" />
        <path d="M5 10v9h5v-5h4v5h5v-9" fill={a ? "currentColor" : "none"} />
      </svg>
    ),
  },
  {
    to: "/situations",
    label: "상황카드",
    icon: (a: boolean) => (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none"
        stroke="currentColor" strokeWidth={a ? 2.2 : 1.8} strokeLinecap="round">
        <rect x="3" y="5" width="18" height="14" rx="3" />
        <path d="M8 10h8M8 14h5" />
      </svg>
    ),
  },
  {
    to: "/relationships",
    label: "관계",
    icon: (a: boolean) => (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill={a ? "currentColor" : "none"}
        stroke={a ? "none" : "currentColor"} strokeWidth={1.8} strokeLinecap="round">
        <path d="M12 21s-7-4.3-7-9a4 4 0 0 1 7-2.6A4 4 0 0 1 19 12c0 4.7-7 9-7 9Z" />
      </svg>
    ),
  },
  {
    to: "/report",
    label: "리포트",
    icon: (a: boolean) => (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none"
        stroke="currentColor" strokeWidth={a ? 2.2 : 1.8} strokeLinecap="round">
        <path d="M4 20V10l8-6 8 6v10" />
        <path d="M9 20v-6h6v6" />
        <polyline points="4,14 9,10 13,13 20,8" strokeWidth={a ? 2.2 : 1.8} />
      </svg>
    ),
  },
  {
    to: "/profile",
    label: "마이",
    icon: (a: boolean) => (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none"
        stroke="currentColor" strokeWidth={a ? 2.2 : 1.8} strokeLinecap="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M5 20a7 7 0 0 1 14 0" />
      </svg>
    ),
  },
];

export function BottomNav() {
  return (
    <nav className="absolute inset-x-0 bottom-0 z-20 border-t border-border bg-card/95 backdrop-blur-md">
      <ul className="mx-auto flex max-w-[480px] items-stretch justify-around px-1 pb-[env(safe-area-inset-bottom)]">
        {tabs.map((t) => (
          <li key={t.to} className="flex-1">
            <NavLink
              to={t.to}
              end={t.to === "/"}
              className={({ isActive }) =>
                cn(
                  "flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-semibold transition-colors",
                  isActive ? "text-pink" : "text-tertiary",
                )
              }
            >
              {({ isActive }) => <>{t.icon(isActive)}{t.label}</>}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
