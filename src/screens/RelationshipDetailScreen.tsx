import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CHARACTERS } from "@/lib/assets";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";
import { PremiumLabel } from "@/components/ui/PremiumLock";
import { MingGuide } from "@/components/ming/MingGuide";
import { mockRelationships, mockProfile } from "@/data/mock";
import { cn } from "@/lib/cn";

const METRICS = [
  { key: "친밀도", icon: "♥", value: 82, color: "bg-pink",   textColor: "text-pink"   },
  { key: "신뢰도", icon: "🛡", value: 76, color: "bg-blue",   textColor: "text-blue"   },
  { key: "설렘",   icon: "✨", value: 71, color: "bg-purple", textColor: "text-purple" },
  { key: "대화",   icon: "💬", value: 91, color: "bg-green",  textColor: "text-green"  },
  { key: "갈등",   icon: "🔥", value: 43, color: "bg-yellow", textColor: "text-yellow" },
];
const GOOD    = ["유머 코드가 잘 맞아요", "서로를 존중해요", "가치관이 비슷해요"];
const CAUTION = ["답장 속도 차이가 있어요", "서운함 표현이 달라요", "혼자 시간이 필요해요"];
const TRAITS_ME   = [{ label: "표현력", me: 88, them: 42 }, { label: "공감력", me: 92, them: 78 }, { label: "즉흥성", me: 70, them: 58 }];
const TRAITS_THEM = [{ label: "신중함", value: 82 }, { label: "독립성", value: 76 }, { label: "계획형", value: 84 }];
const RECENT_CARDS  = ["약속 30분 늦었어요", "생일을 축하했어요", "답장이 너무 느려요", "연락이 뜸해졌어요"];
const RECENT_EMOJIS = ["🕐", "🎂", "💬", "💌"];

function Accordion({ label, children, defaultOpen = false }: { label: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-xl bg-card border border-border overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3.5 text-sm font-bold text-primary"
      >
        {label}
        <span className={cn("text-tertiary text-xs transition-transform duration-200", open && "rotate-180")}>▾</span>
      </button>
      {open && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
}

export default function RelationshipDetailScreen() {
  const { id } = useParams();
  const nav = useNavigate();
  const r = mockRelationships.find((x) => x.id === id);
  if (!r) return <div className="p-6 text-secondary">관계를 찾을 수 없어.</div>;

  return (
    <div className="pb-6">
      {/* nav */}
      <div className="flex items-center justify-between px-5 pt-4 pb-2">
        <button
          onClick={() => nav(-1)}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-card border border-border text-primary text-lg"
        >
          ‹
        </button>
        <p className="font-extrabold text-primary">{r.name}</p>
        <div className="w-9" />
      </div>

      {/* dual character hero — primary */}
      <div
        className="mx-5 mb-3 rounded-xl overflow-hidden border border-border p-4"
        style={{ background: "linear-gradient(160deg, #1A1235 0%, #0E0B16 100%)" }}
      >
        <div className="flex items-end justify-center gap-3">
          {/* me */}
          <div className="flex flex-col items-center gap-1.5 flex-1">
            <div className="h-[88px] w-[88px] overflow-hidden rounded-xl bg-white ring-pink-neon">
              <img
                src={CHARACTERS[mockProfile.characterId].src}
                alt="나"
                className="h-full w-full object-contain object-top"
              />
            </div>
            <span className="text-xs font-bold text-pink">나</span>
          </div>

          {/* chemistry */}
          <div className="flex flex-col items-center gap-1.5 pb-2 shrink-0">
            <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full border-4 border-pink bg-card shadow-glow-pink">
              <div className="text-center">
                <p className="text-[9px] text-secondary leading-none mb-0.5">케미</p>
                <p className="text-xl font-black text-grad-cta leading-none">87<span className="text-xs">%</span></p>
              </div>
            </div>
            <Badge tone="pink">좋은 케미 💜</Badge>
          </div>

          {/* them */}
          <div className="flex flex-col items-center gap-1.5 flex-1">
            <div className="h-[88px] w-[88px] overflow-hidden rounded-xl bg-white ring-purple-neon">
              <img
                src={CHARACTERS[r.characterId].src}
                alt={r.name}
                className="h-full w-full object-contain object-top"
              />
            </div>
            <span className="text-xs font-bold text-secondary">{r.name}</span>
          </div>
        </div>

        {/* MING one-liner */}
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2">
          <MingGuide emotion="coach" size="xs" />
          <p className="text-xs text-secondary leading-snug">
            {r.name}은 표현은 적지만 관심은 꾸준해요. 짧게 먼저 연락해봐요 💜
          </p>
        </div>
      </div>

      {/* quick message chips */}
      <div className="px-5 mb-4">
        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          {["안부 인사", "칭찬하기", "요즘 어때?", "함께 뭐할까?"].map((chip) => (
            <button
              key={chip}
              className="shrink-0 rounded-full border border-border bg-card px-3 py-2 text-xs text-secondary whitespace-nowrap active:scale-[0.97] transition"
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* accordions — all secondary */}
      <div className="px-5 space-y-2">
        <Accordion label="관계 상태">
          <div className="grid grid-cols-5 gap-2 pt-1">
            {METRICS.map((m) => (
              <div key={m.key} className="flex flex-col items-center gap-1">
                <p className="text-base">{m.icon}</p>
                <p className={`text-sm font-extrabold ${m.textColor}`}>{m.value}</p>
                <div className="w-full h-1 rounded-full bg-border overflow-hidden">
                  <div className={`h-full rounded-full ${m.color}`} style={{ width: `${m.value}%` }} />
                </div>
                <p className="text-[9px] text-tertiary text-center">{m.key}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3 mt-3">
            <div>
              <p className="text-xs font-bold text-green mb-1.5">👍 잘 맞는 점</p>
              {GOOD.map((g) => <p key={g} className="text-xs text-secondary mb-1">✓ {g}</p>)}
            </div>
            <div>
              <p className="text-xs font-bold text-yellow mb-1.5">⚠️ 조심할 점</p>
              {CAUTION.map((c) => <p key={c} className="text-xs text-secondary mb-1">! {c}</p>)}
            </div>
          </div>
        </Accordion>

        <Accordion label="성향 비교">
          <div className="grid grid-cols-2 gap-4 pt-1">
            <div>
              <p className="text-xs text-pink font-semibold mb-2">♥ 나 vs {r.name}</p>
              {TRAITS_ME.map((t) => (
                <div key={t.label} className="mb-2">
                  <div className="flex justify-between text-[11px] mb-0.5">
                    <span className="text-secondary">{t.label}</span>
                    <span className="text-pink font-bold">{t.me}<span className="text-tertiary">/{t.them}</span></span>
                  </div>
                  <div className="relative h-1.5 rounded-full bg-border overflow-hidden">
                    <div className="absolute left-0 h-full rounded-full bg-pink" style={{ width: `${t.me}%` }} />
                    <div className="absolute left-0 h-full rounded-full bg-blue/40" style={{ width: `${t.them}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div>
              <p className="text-xs text-blue font-semibold mb-2">💙 {r.name}의 강점</p>
              {TRAITS_THEM.map((t) => (
                <div key={t.label} className="mb-2">
                  <div className="flex justify-between text-[11px] mb-0.5">
                    <span className="text-secondary">{t.label}</span>
                    <span className="text-blue font-bold">{t.value}</span>
                  </div>
                  <ProgressBar value={t.value} tone="cool" height="h-1.5" />
                </div>
              ))}
            </div>
          </div>
        </Accordion>

        <Accordion label="최근 상황카드">
          <div className="no-scrollbar flex gap-2 overflow-x-auto pt-1">
            {RECENT_CARDS.map((card, i) => (
              <div key={i} className="shrink-0 rounded-lg bg-bg border border-border p-3 w-[100px]">
                <span className="text-base block mb-1">{RECENT_EMOJIS[i] ?? ""}</span>
                <p className="text-[11px] text-secondary leading-tight">{card}</p>
              </div>
            ))}
          </div>
        </Accordion>

        {/* chat unlock — compact */}
        <div className="rounded-xl bg-card border border-border p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-bold text-primary">채팅 해금</p>
            {r.chatUnlocked
              ? <Badge tone="green">해금!</Badge>
              : <span className="text-xs text-tertiary">{r.exchangeCount}/20 교환</span>
            }
          </div>
          <ProgressBar value={(r.exchangeCount / 20) * 100} tone="pink" />
        </div>

        {/* premium — compact */}
        <div className="rounded-xl bg-card border border-border px-4 py-3 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-primary">심층 궁합 리포트</p>
            <p className="text-xs text-tertiary mt-0.5">AI가 더 깊이 분석해줄게요</p>
          </div>
          <PremiumLabel />
        </div>
      </div>

      {/* sticky CTA */}
      <div className="px-5 mt-5">
        <button className="w-full rounded-full bg-grad-cta py-4 text-base font-bold text-white shadow-glow-cta active:scale-[0.98] transition">
          🎴 상황카드 보내기
        </button>
      </div>
    </div>
  );
}
