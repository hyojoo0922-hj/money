import { Outlet, useLocation } from "react-router-dom";
import { BottomNav } from "./BottomNav";

const NO_NAV_PREFIXES = ["/onboarding", "/splash"];

export function AppShell() {
  const { pathname } = useLocation();
  const showNav = !NO_NAV_PREFIXES.some((p) => pathname.startsWith(p));
  return (
    <div className="min-h-[100dvh] w-full bg-[#09060f] md:py-6">
      <div
        className="relative mx-auto flex w-full max-w-[480px] flex-col bg-bg md:rounded-[36px] md:shadow-2xl"
        style={{ minHeight: "100dvh" }}
      >
        <main
          className="no-scrollbar w-full overflow-y-auto overflow-x-hidden"
          style={{
            paddingBottom: showNav
              ? "calc(60px + env(safe-area-inset-bottom, 16px))"
              : "0px",
            minHeight: "100dvh",
          }}
        >
          <Outlet />
        </main>
        {showNav && <BottomNav />}
      </div>
    </div>
  );
}
