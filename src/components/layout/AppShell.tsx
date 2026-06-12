import { Outlet, useLocation } from "react-router-dom";
import { BottomNav } from "./BottomNav";

const NO_NAV_PREFIXES = ["/onboarding", "/splash"];

export function AppShell() {
  const { pathname } = useLocation();
  const showNav = !NO_NAV_PREFIXES.some((p) => pathname.startsWith(p));
  return (
    <div className="min-h-[100dvh] w-full bg-[#09060f] md:py-6">
      <div className="relative mx-auto flex min-h-[100dvh] w-full max-w-[480px] flex-col overflow-hidden bg-bg md:min-h-[860px] md:rounded-[36px] md:shadow-2xl">
        <main className="no-scrollbar flex-1 overflow-y-auto pb-24">
          <Outlet />
        </main>
        {showNav && <BottomNav />}
      </div>
    </div>
  );
}
