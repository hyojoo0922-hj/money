import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { OnbStep } from "./_Step";
import { CharacterPicker } from "@/components/character/CharacterPicker";
import { MingGuide } from "@/components/ming/MingGuide";
import { type CharacterId, type Gender } from "@/lib/assets";

export default function SelectScreen() {
  const nav = useNavigate();
  const { state } = useLocation() as { state?: { gender?: Gender; recommended?: CharacterId } };
  const gender: Gender = state?.gender ?? "female";
  const [value, setValue] = useState<CharacterId | undefined>(state?.recommended);
  return (
    <OnbStep step={5} total={6}>
      <div className="flex items-center gap-3 mb-5">
        <MingGuide emotion="pointing" size="sm" />
        <div>
          <h1 className="text-lg font-extrabold text-primary">얼굴을 골라줘</h1>
          <p className="text-xs text-secondary">얼굴은 고정돼. 성향은 앞으로 바뀌어.</p>
        </div>
      </div>
      <CharacterPicker gender={gender} value={value} recommended={state?.recommended} onChange={setValue} />
      <button disabled={!value} onClick={() => nav("/onboarding/intro", { state: { characterId: value } })}
        className="mt-8 w-full rounded-full bg-grad-cta py-4 text-base font-bold text-white shadow-glow-cta disabled:opacity-40 disabled:pointer-events-none transition active:scale-[0.97]">
        이 얼굴로 시작하기
      </button>
    </OnbStep>
  );
}
