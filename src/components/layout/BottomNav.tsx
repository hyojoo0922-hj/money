import { NavLink } from "react-router-dom";
import { cn } from "@/lib/cn";

const tabs = [
  {
    to: "/",
    label: "홈",
    d: "M3 12L12 4l9 8M5 10v9h5v-5h4v5h5v-9",
  },
  {
    to: "/situations",
    label: "상황카드",
    d: "M3 6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6zM8 10h8M8 14h5",
  },
  {
    to: "/relationships",
    label: "관계",
    d: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z",
  },
  {
    to: "/report",
    label: "리포트",
    d: "M6 20v-6M12 20V4M18 20v-10",
  },
  {
    to: "/profile",
    label: "마이",
    d: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm-7 8a7 7 0 0 1 14 0",
  },
];

export function BottomNav() {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/98 backdrop-blur-md"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 8px)" }}
    >
      <ul className="mx-auto flex max-w-[480px] items-stretch justify-around">
        {tabs.map((t) => (
          <li key={t.to} className="flex-1">
            <NavLink
              to={t.to}
              end={t.to === "/"}
              className={({ isActive }) =>
                cn(
                  "flex flex-col items-center gap-[3px] py-2.5 text-[10px] font-semibold transition-colors",
                  isActive ? "text-pink" : "text-tertiary",
                )
              }
            >
              {({ isActive }) => (
                <>
                  <svg
                    viewBox="0 0 24 24"
                    className="h-[22px] w-[22px]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={isActive ? 2.4 : 1.8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={t.d} />
                  </svg>
                  {t.label}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
