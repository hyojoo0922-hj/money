import { useNavigate } from "react-router-dom";
import { MingGuide } from "@/components/ming/MingGuide";

export default function SplashScreen() {
  const nav = useNavigate();
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center gap-6 bg-bg px-8 text-center"
      style={{ background: "radial-gradient(ellipse at 50% 30%, #2D1B6E 0%, #0E0B16 70%)" }}>
      <MingGuide emotion="creating" size="xl" float />
      <div>
        <h1 className="text-4xl font-black text-grad-cta">MINGLEY</h1>
        <p className="mt-2 text-sm text-secondary">사람을 소비하지 않고 관계를 키우는 곳</p>
      </div>
      <button onClick={() => nav("/onboarding/welcome")}
        className="rounded-full bg-grad-cta px-10 py-4 text-base font-bold text-white shadow-glow-cta transition active:scale-[0.97]">
        시작하기
      </button>
    </div>
  );
}
