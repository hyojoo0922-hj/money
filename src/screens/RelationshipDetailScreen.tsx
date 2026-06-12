import { useParams, useNavigate } from "react-router-dom";
import { CHARACTERS } from "@/lib/assets";
import { MingInsightCard } from "@/components/ming/MingInsightCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";
import { PremiumLabel } from "@/components/ui/PremiumLock";
import { mockRelationships, mockProfile } from "@/data/mock";

const METRICS = [
  { key: "친밀도", icon: "♥", value: 82, color: "bg-pink", textColor: "text-pink" },
  { key: "신뢰도", icon: "🛡", value: 76, color: "bg-blue", textColor: "text-blue" },
  { key: "설렘", icon: "✨", value: 71, color: "bg-purple", textColor: "text-purple" },
  { key: "대화 궁합", icon: "💬", value: 91, color: "bg-green", textColor: "text-green" },
  { key: "갈등 위험", icon: "🔥", value: 43, color: "bg-yellow", textColor: "text-yellow" },
];
const GOOD = ["유머 코드가 잘 맞아요", "서로를 존중하고 배려해요", "가치관이 비슷해요"];
const CAUTION = ["답장 속도 차이가 있어요", "서운함 표현 방식이 달라요", "혼자만의 시간이 필요해요"];
const TRAITS_ME = [{ label: "표현력", me: 88, them: 42 }, { label: "공감력", me: 92, them: 78 }, { label: "즉흥성", me: 70, them: 58 }];
const TRAITS_THEM = [{ label: "신중함", value: 82 }, { label: "독립성", value: 76 }, { label: "계획형", value: 84 }];
const RECENT_CARDS = ["약속 시간에 30분 늦었어요", "생일을 축하했어요", "답장이 너무 느려요", "연락이 뜸해졌어요"];

export default function RelationshipDetailScreen() {
  const { id } = useParams();
  const nav = useNavigate();
  const r = mockRelationships.find((x) => x.id === id);
  if (!r) return <div className="p-6 text-secondary">관계를 찾을 수 없어.</div>;

  return (
    <div className="pb-8">
      {/* nav */}
      <div className="flex items-center justify-between px-5 pt-4 pb-2">
        <button onClick={() => nav(-1)} className="flex h-9 w-9 items-center justify-center rounded-full bg-card border border-border text-primary text-xl">‹</button>
        <p className="font-extrabold text-primary">버블걸 ♥ {r.name}</p>
        <button className="flex h-9 w-9 items-center justify-center rounded-full bg-card border border-border text-secondary">···</button>
      </div>
      <p className="text-center text-xs text-secondary pb-3">서로를 이해하고 배려할 때 더 빛나는 사이에요 ✨</p>

      {/* dual character hero */}
      <div className="mx-5 mb-4 rounded-xl bg-hero-bg border border-border overflow-hidden p-4">
        <div className="flex items-end justify-center gap-4">
          {/* me */}
          <div className="flex flex-col items-center gap-2">
            <div className="h-20 w-20 overflow-hidden rounded-full ring-pink-neon">
              <img src={CHARACTERS[mockProfile.characterId].src} alt="나" className="h-full w-full object-cover object-top" />
            </div>
            <div className="flex items-center gap-1">
              <span className="text-xs rounded-full bg-pink/20 text-pink px-1.5 py-0.5 font-bold">나</span>
              <p className="text-sm font-bold text-primary">버블걸</p>
              <Badge tone="muted">Lv.12</Badge>
            </div>
            <div className="flex flex-wrap justify-center gap-1 max-w-[90px]">
              {["#솔직한","#감정적인"].map(t => <span key={t} className="text-[10px] text-secondary">{t}</span>)}
            </div>
          </div>

          {/* chemistry donut placeholder */}
          <div className="flex flex-col items-center gap-1 pb-4">
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-card border-4 border-pink shadow-glow-pink">
              <div>
                <p className="text-[10px] text-secondary text-center">우리 케미</p>
                <p className="text-2xl font-black text-grad-cta leading-none text-center">87<span className="text-base">%</span></p>
              </div>
            </div>
            <Badge tone="pink">좋은 케미에요! 💜</Badge>
          </div>

          {/* them */}
          <div className="flex flex-col items-center gap-2">
            <div className="h-20 w-20 overflow-hidden rounded-full ring-purple-neon">
              <img src={CHARACTERS[r.characterId].src} alt={r.name} className="h-full w-full object-cover object-top" />
            </div>
            <div className="flex items-center gap-1">
              <span className="text-xs rounded-full bg-blue/20 text-blue px-1.5 py-0.5 font-bold">상대</span>
              <p className="text-sm font-bold text-primary">{r.name}</p>
              <Badge tone="muted">Lv.11</Badge>
            </div>
            <div className="flex flex-wrap justify-center gap-1 max-w-[90px]">
              {["#신중한","#배려심"].map(t => <span key={t} className="text-[10px] text-secondary">{t}</span>)}
            </div>
          </div>
        </div>
      </div>

      {/* 5-metric status grid */}
      <div className="mx-5 mb-4 rounded-xl bg-card border border-border p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="font-bold text-primary">관계 상태</p>
          <button className="text-xs text-purple">자세히 보기 ›</button>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {METRICS.map((m) => (
            <div key={m.key} className="flex flex-col items-center gap-1">
              <p className="text-lg">{m.icon}</p>
              <p className={`text-base font-extrabold ${m.textColor}`}>{m.value}</p>
              <div className="w-full h-1 rounded-full bg-border overflow-hidden">
                <div className={`h-full rounded-full ${m.color}`} style={{ width: `${m.value}%` }} />
              </div>
              <p className="text-[9px] text-tertiary text-center leading-tight">{m.key}</p>
            </div>
          ))}
        </div>
      </div>

      {/* good / caution columns */}
      <div className="mx-5 mb-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-card border border-green/20 p-3">
          <p className="text-xs font-bold text-green mb-2">👍 우리가 잘 맞는 점</p>
          {GOOD.map((g) => (
            <div key={g} className="flex items-start gap-1.5 mb-1.5">
              <span className="text-green text-xs mt-0.5">✓</span>
              <p className="text-xs text-primary leading-tight">{g}</p>
            </div>
          ))}
        </div>
        <div className="rounded-xl bg-card border border-yellow/20 p-3">
          <p className="text-xs font-bold text-yellow mb-2">⚠️ 조심하면 더 좋아져요</p>
          {CAUTION.map((c) => (
            <div key={c} className="flex items-start gap-1.5 mb-1.5">
              <span className="text-yellow text-xs mt-0.5">!</span>
              <p className="text-xs text-primary leading-tight">{c}</p>
            </div>
          ))}
        </div>
      </div>

      {/* MING coaching */}
      <div className="mx-5 mb-4">
        <MingInsightCard emotion="coach" title="MING의 관계 코칭" ai
          message={`요즘 ${r.name}은 표현은 적지만 관심은 꾸준한 편이에요. 짧게라도 먼저 연락해보면 좋은 반응을 얻을 수 있어요! 💜`} />
        <div className="mt-2 flex flex-wrap gap-2 pl-1">
          {["짧은 안부 인사", "공통 관심사 이야기", "가볍게 질문 던지기"].map((chip) => (
            <button key={chip} className="rounded-full bg-purple/10 border border-purple/30 px-3 py-1 text-xs font-semibold text-purple">{chip}</button>
          ))}
        </div>
      </div>

      {/* head-to-head trait comparison */}
      <div className="mx-5 mb-4 rounded-xl bg-card border border-border p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="font-bold text-primary">성향 비교</p>
          <button className="text-xs text-purple">자세히 보기 ›</button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-pink font-semibold mb-2">♥ 나 vs {r.name}</p>
            {TRAITS_ME.map((t) => (
              <div key={t.label} className="mb-2">
                <div className="flex justify-between text-[11px] mb-0.5">
                  <span className="text-secondary">{t.label}</span>
                  <span className="text-pink font-bold">{t.me} <span className="text-tertiary">/ {t.them}</span></span>
                </div>
                <div className="relative h-1.5 rounded-full bg-border overflow-hidden">
                  <div className="absolute left-0 h-full rounded-full bg-pink" style={{ width: `${t.me}%` }} />
                  <div className="absolute left-0 h-full rounded-full bg-blue/50" style={{ width: `${t.them}%` }} />
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
      </div>

      {/* recent situation cards strip */}
      <div className="mx-5 mb-4">
        <div className="flex items-center justify-between mb-2">
          <p className="font-bold text-primary">최근 상황카드</p>
          <button className="text-xs text-purple">전체 보기 ›</button>
        </div>
        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          {RECENT_CARDS.map((card, i) => (
            <div key={i} className="shrink-0 rounded-lg bg-card border border-border p-3 w-[110px]">
              <span className="text-lg block mb-1">{["🕐","🎂","💬","💌"][i]}</span>
              <p className="text-[11px] text-secondary leading-tight">{card}</p>
            </div>
          ))}
        </div>
      </div>

      {/* message bar */}
      <div className="mx-5 mb-4">
        <div className="flex items-center gap-2 rounded-xl bg-card border border-border p-3">
          <input placeholder="메시지를 입력하세요..." className="flex-1 bg-transparent text-sm text-primary placeholder:text-tertiary outline-none" />
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-grad-cta shadow-glow-pink text-white">›</button>
        </div>
        <div className="no-scrollbar flex gap-2 overflow-x-auto mt-2">
          {["안부 인사", "칭찬하기", "요즘 어때?", "함께 뭐할까?"].map((chip) => (
            <button key={chip} className="shrink-0 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-secondary whitespace-nowrap">{chip}</button>
          ))}
        </div>
      </div>

      {/* chat unlock info */}
      <div className="mx-5 mb-4 rounded-xl bg-card border border-border p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="font-bold text-primary">채팅 해금 현황</p>
          {r.chatUnlocked && <Badge tone="green">해금!</Badge>}
        </div>
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-secondary">질문 교환</span>
          <span className="font-bold text-primary">{r.exchangeCount}/20</span>
        </div>
        <ProgressBar value={(r.exchangeCount / 20) * 100} tone="pink" />
        <p className="mt-1.5 text-xs text-tertiary">관계 성장 조건 · 20회 교환 · 상호 동의 충족 시 해금</p>
      </div>

      {/* premium */}
      <div className="mx-5 mb-4 rounded-xl bg-card border border-border p-4">
        <div className="flex items-center justify-between mb-1">
          <p className="font-bold text-primary">심층 궁합 리포트</p>
          <PremiumLabel />
        </div>
        <p className="text-sm text-secondary mb-3">서로의 성향이 부딪히는 지점과 맞춰가는 법을 MING이 분석해.</p>
        <button className="w-full rounded-full border border-purple/50 py-2.5 text-sm font-semibold text-purple">미리보기</button>
      </div>

      {/* sticky bottom CTA */}
      <div className="mx-5">
        <button className="w-full rounded-full bg-grad-cta py-4 text-base font-bold text-white shadow-glow-cta">
          🎴 상황카드 보내기
        </button>
      </div>
    </div>
  );
}

function ProgressBar({ value, tone, height }: { value: number; tone?: string; height?: string }) {
  const fills: Record<string, string> = { pink: "bg-pink", cool: "bg-grad-cool", cta: "bg-grad-cta" };
  return (
    <div className={`w-full overflow-hidden rounded-full bg-border ${height ?? "h-2"}`}>
      <div className={`h-full rounded-full ${fills[tone ?? "cta"] ?? "bg-grad-cta"}`} style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  );
}
