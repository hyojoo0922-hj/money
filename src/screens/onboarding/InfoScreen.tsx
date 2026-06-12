import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { OnbStep } from "./_Step";
import { cn } from "@/lib/cn";

export default function InfoScreen() {
  const nav = useNavigate();
  const [gender, setGender] = useState<"female" | "male" | null>(null);
  const [year, setYear] = useState("");
  const ok = gender && year.length === 4;
  return (
    <OnbStep step={2} total={6}>
      <h1 className="text-xl font-extrabold text-primary">기본 정보를 알려줘</h1>
      <p className="mt-1 text-sm text-secondary">캐릭터 추천에만 사용돼.</p>
      <p className="mt-6 mb-2 text-sm font-semibold text-primary">성별</p>
      <div className="grid grid-cols-2 gap-3">
        {(["female", "male"] as const).map((g) => (
          <button key={g} onClick={() => setGender(g)}
            className={cn("rounded-xl py-4 text-sm font-bold transition",
              gender === g ? "bg-grad-cta text-white shadow-glow-pink" : "bg-card border border-border text-secondary")}>
            {g === "female" ? "여성" : "남성"}
          </button>
        ))}
      </div>
      <p className="mt-6 mb-2 text-sm font-semibold text-primary">출생연도</p>
      <input value={year} inputMode="numeric" maxLength={4} onChange={(e) => setYear(e.target.value.replace(/\D/g,""))}
        placeholder="예: 1998"
        className="w-full rounded-xl border border-border bg-card p-3.5 text-sm text-primary placeholder:text-tertiary outline-none focus:border-purple/60 transition" />
      <button disabled={!ok} onClick={() => nav("/onboarding/questions", { state: { gender } })}
        className="mt-8 w-full rounded-full bg-grad-cta py-4 text-base font-bold text-white shadow-glow-cta disabled:opacity-40 disabled:pointer-events-none transition active:scale-[0.97]">
        다음
      </button>
    </OnbStep>
  );
}
