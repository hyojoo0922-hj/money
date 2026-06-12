import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { OnbStep } from "./_Step";
import { MingGuide } from "@/components/ming/MingGuide";
import { CharacterCard } from "@/components/character/CharacterCard";
import { charactersByGender, type Gender } from "@/lib/assets";

export default function RecommendScreen() {
  const nav = useNavigate();
  const { state } = useLocation() as { state?: { gender?: Gender } };
  const gender: Gender = state?.gender ?? "female";
  const [loading, setLoading] = useState(true);
  const recommended = charactersByGender(gender)[0];
  useEffect(() => { const t = setTimeout(() => setLoading(false), 1800); return () => clearTimeout(t); }, []);
  if (loading) {
    return (
      <div className="flex min-h-[100dvh] flex-col items-center justify-center gap-5 px-8 text-center"
        style={{ background: "radial-gradient(ellipse at 50% 30%, #1A0E3D 0%, #0E0B16 70%)" }}>
        <MingGuide emotion="analyzingWork" size="xl" float />
        <p className="text-xl font-extrabold text-primary">MING이 분석하는 중...</p>
        <p className="text-sm text-secondary">답변에서 성향을 읽고 있어</p>
        <div className="flex gap-1.5 mt-2">
          {[0,1,2].map(n => <div key={n} className="h-2 w-2 rounded-full bg-pink animate-pulse" style={{ animationDelay: `${n*0.25}s` }} />)}
        </div>
      </div>
    );
  }
  return (
    <OnbStep step={4} total={6}>
      <div className="flex flex-col items-center gap-4 text-center">
        <MingGuide emotion="success" size="lg" float />
        <h1 className="text-xl font-extrabold text-primary">너랑 어울리는 얼굴을 찾았어!</h1>
        <p className="text-sm text-secondary">이 얼굴이 마음에 들어? 다음 화면에서 직접 골라도 돼.</p>
      </div>
      <div className="mx-auto mt-6 w-40"><CharacterCard id={recommended} selected /></div>
      <button onClick={() => nav("/onboarding/select", { state: { gender, recommended } })}
        className="mt-8 w-full rounded-full bg-grad-cta py-4 text-base font-bold text-white shadow-glow-cta transition active:scale-[0.97]">
        직접 골라볼게
      </button>
    </OnbStep>
  );
}
