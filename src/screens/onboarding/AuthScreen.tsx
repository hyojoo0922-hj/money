import { useNavigate } from "react-router-dom";
import { OnbStep } from "./_Step";
import { MingGuide } from "@/components/ming/MingGuide";
import { cn } from "@/lib/cn";

const providers = [
  { key: "kakao", label: "카카오로 계속하기", cls: "bg-[#FEE500] text-[#3A1D1D]" },
  { key: "google", label: "Google로 계속하기", cls: "bg-white text-[#1F1F2E] border border-gray-200" },
  { key: "apple", label: "Apple로 계속하기", cls: "bg-white text-black" },
];

export default function AuthScreen() {
  const nav = useNavigate();
  return (
    <OnbStep step={1} total={6}>
      <div className="flex flex-col items-center gap-5 text-center">
        <MingGuide emotion="signup" size="lg" float />
        <h1 className="text-xl font-extrabold text-primary">로그인하고 시작하기</h1>
        <div className="w-full space-y-3">
          {providers.map((p) => (
            <button key={p.key} onClick={() => nav("/onboarding/info")}
              className={cn("w-full rounded-full py-3.5 text-sm font-semibold transition active:scale-[0.97]", p.cls)}>
              {p.label}
            </button>
          ))}
        </div>
        <button onClick={() => nav("/onboarding/info")} className="text-sm text-secondary hover:text-primary">이메일로 계속하기</button>
      </div>
    </OnbStep>
  );
}
