import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CHARACTERS } from "@/lib/assets";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";
import { PremiumLabel } from "@/components/ui/PremiumLock";
import { MingGuide } from "@/components/ming/MingGuide";
import { mockRelationships, mockProfile, mockPrimaryArchetype } from "@/data/mock";
import { EmptyState } from "@/components/ui/EmptyState";
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

function Accordion({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
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

  const goBack = () =>
    window.history.length > 1 ? nav(-1) : nav("/relationships");

  if (!r) {
    return (
      <div className="px-5 pb-6">
        <div className="flex items-center justify-between pt-4 pb-2">
          <button
            onClick={goBack}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-card border border-border text-primary text-lg"
          >‹</button>
          <p className="font-extrabold text-primary">관계</p>
          <div className="w-9" />
        </div>
        <EmptyState
          title="이 관계를 찾을 수 없어"
          hint="관계 추가 기능은 곧 만날 수 있어. 우선 목록에서 다른 관계를 확인해봐."
        />
        <button
          onClick={() => nav("/relationships")}
          className="mt-2 w-full rounded-full bg-grad-cta py-3.5 text-sm font-bold text-white shadow-glow-pink active:scale-[0.98] transition"
        >
          관계 목록으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="pb-6">
      {/* nav */}
      <div className="flex items-center justify-between px-5 pt-4 pb-2">
        <button
          onClick={goBack}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-card border border-border text-primary text-lg"
        >‹</button>
        <p className="font-extrabold text-primary">{r.name}</p>
        <div className="w-9" />
      </div>

      {/* ── EMOTIONAL HERO — portraits dominant, AI-asset ready ── */}
      <div
        className="mx-5 mb-4 rounded-xl overflow-hidden border border-border"
        style={{ background: "linear-gradient(160deg, #1A1235 0%, #0E0B16 100%)" }}
      >
        <div className="flex items-end justify-center gap-3 pt-5 px-4">

          {/* my portrait — AI-asset ready, aspect-[3/4], 120px wide */}
          <div className="flex flex-col items-center gap-1.5 flex-1">
            <div
              className="overflow-hidden rounded-xl ring-pink-neon"
              style={{
                width: "120px",
                height: "160px",
                background: "linear-gradient(to bottom, #1A1235, #0E0B16)",
              }}
            >
              <img
                src={CHARACTERS[mockProfile.characterId].src}
                alt="나"
                className="h-full w-full object-contain object-top"
                draggable={false}
              />
            </div>
            <span className="text-xs font-bold text-pink">나</span>
            {/* my archetype — visible, per approved spec */}
            <span className="text-[10px] font-semibold text-pink/80">
              {mockPrimaryArchetype.name_ko}
            </span>
          </div>

          {/* chemistry — between portraits, visually smaller than portraits */}
          <div className="flex flex-col items-center gap-1.5 pb-6 shrink-0">
            <div className="flex h-[64px] w-[64px] items-center justify-center rounded-full border-4 border-pink bg-card shadow-glow-pink">
              <div className="text-center">
                <p className="text-[8px] text-secondary leading-none mb-0.5">우리 케미</p>
                <p className="text-lg font-black text-grad-cta leading-none">87<span className="text-[10px]">%</span></p>
              </div>
            </div>
            <Badge tone="pink">잘 맞는 사이 💜</Badge>
          </div>

          {/* their portrait — AI-asset ready, aspect-[3/4], 120px wide */}
          <div className="flex flex-col items-center gap-1.5 flex-1">
            <div
              className="overflow-hidden rounded-xl ring-purple-neon"
              style={{
                width: "120px",
                height: "160px",
                background: "linear-gradient(to bottom, #1A1235, #0E0B16)",
              }}
            >
              <img
                src={CHARACTERS[r.characterId].src}
                alt={r.name}
                className="h-full w-full object-contain object-top"
                draggable={false}
              />
            </div>
            <span className="text-xs font-bold text-secondary">{r.name}</span>
            {/* other person's archetype intentionally hidden — privacy rules TBD */}
            <span className="text-[10px] text-tertiary">···</span>
          </div>
        </div>

        {/* MING one-liner */}
        <div className="px-5 pt-4 pb-5">
          <div className="flex items-start gap-3 rounded-xl bg-white/5 border border-white/8 px-4 py-3">
            <MingGuide emotion="coach" size="xs" className="mt-0.5 shrink-0" />
            <p className="text-sm text-primary leading-relaxed">
              {r.name}은 표현은 적지만 관심은 꾸준해요.
              <span className="text-pink font-semibold"> 먼저 다가가면 관계가 더 가까워질 거예요.</span>
            </p>
          </div>
        </div>
      </div>

      {/* primary CTA */}
      <div className="px-5 mb-4">
        <button className="w-full rounded-full bg-grad-cta py-4 text-base font-bold text-white shadow-glow-cta active:scale-[0.98] transition">
          🎴 상황카드 보내기
        </button>
      </div>

      {/* quick chips */}
      <div className="px-5 mb-5">
        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          {["안부 인사", "칭찬하기", "요즘 어때?", "함께 뭐할까?"].map((chip) => (
            <button key={chip} className="shrink-0 rounded-full border border-border bg-card px-3 py-2 text-xs text-secondary whitespace-nowrap active:scale-[0.97] transition">
              {chip}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 mb-3">
        <p className="text-xs font-semibold text-tertiary">더 알아보기</p>
      </div>

      {/* accordions */}
      <div className="px-5 space-y-2">
        <Accordion label="우리 사이 들여다보기">
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

        <Accordion label="우리의 다른 점">
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

        <Accordion label="최근 나눈 이야기">
          <div className="no-scrollbar flex gap-2 overflow-x-auto pt-1">
            {RECENT_CARDS.map((card, i) => (
              <div key={i} className="shrink-0 rounded-lg bg-bg border border-border p-3 w-[100px]">
                <span className="text-base block mb-1">{RECENT_EMOJIS[i] ?? ""}</span>
                <p className="text-[11px] text-secondary leading-tight">{card}</p>
              </div>
            ))}
          </div>
        </Accordion>

        <div className="rounded-xl bg-card border border-border p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-bold text-primary">관계 성장 현황</p>
            {r.chatUnlocked
              ? <Badge tone="green">연결됨</Badge>
              : <span className="text-xs text-tertiary">{r.exchangeCount}/20 질문 교환</span>}
          </div>
          <ProgressBar value={(r.exchangeCount / 20) * 100} tone="pink" />
          <p className="mt-1.5 text-xs text-tertiary">
            {r.chatUnlocked
              ? "서로를 충분히 이해했어요. 이제 대화가 시작돼요."
              : "질문을 주고받을수록 관계가 가까워져요."}
          </p>
        </div>

        <div className="rounded-xl bg-card border border-border px-4 py-3 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-primary">더 깊이 알고 싶다면</p>
            <p className="text-xs text-tertiary mt-0.5">AI가 우리 관계를 더 자세히 분석해줄게요</p>
          </div>
          <PremiumLabel />
        </div>
      </div>
    </div>
  );
}
