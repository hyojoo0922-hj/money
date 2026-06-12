import { useNavigate } from "react-router-dom";
import { MingGuide } from "@/components/ming/MingGuide";
import { BRAND } from "@/lib/assets";

export default function WelcomeScreen() {
  const nav = useNavigate();
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center gap-6 px-8 text-center"
      style={{ background: "radial-gradient(ellipse at 50% 20%, #1A0A3D 0%, #0E0B16 70%)" }}>
      <div className="relative">
        <img src={BRAND.bubbleGirl} alt="" className="h-44 w-44 rounded-xl object-cover ring-pink-neon" />
        <MingGuide emotion="firstVisit" size="md" className="absolute -bottom-4 -right-4" float />
      </div>
      <div>
        <h1 className="text-2xl font-extrabold text-primary">처음 왔구나, 환영해!</h1>
        <p className="mt-2 text-sm text-secondary">MINGLEY는 사람을 평가하지 않아.<br />질문으로 관계를 키우는 곳이야.</p>
      </div>
      <button onClick={() => nav("/onboarding/auth")}
        className="w-full max-w-xs rounded-full bg-grad-cta py-4 text-base font-bold text-white shadow-glow-cta transition active:scale-[0.97]">
        시작할게
      </button>
    </div>
  );
}
