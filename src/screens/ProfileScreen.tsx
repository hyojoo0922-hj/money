import { Link } from "react-router-dom";
import { CHARACTERS } from "@/lib/assets";
import { MingInsightCard } from "@/components/ming/MingInsightCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";
import { PremiumLabel } from "@/components/ui/PremiumLock";
import { StatCard } from "@/components/ui/StatCard";
import { Sparkline } from "@/components/ui/Sparkline";
import { mockProfile, mockPrimaryArchetype, mockCategoryScores, mockTopTraits, mockEvolutionHistory } from "@/data/mock";

const DNA_TRAITS = [
  { emoji: "♥", label: "공감력",  value: 92, tone: "pink" as const },
  { emoji: "✦", label: "직관성",  value: 88, tone: "purple" as const },
  { emoji: "🛡", label: "신중함",  value: 76, tone: "blue" as const },
  { emoji: "😊", label: "유쾌함",  value: 94, tone: "green" as const },
  { emoji: "⚖️", label: "정의로움", value: 86, tone: "yellow" as const },
];

const ACCURACY_TREND = [79,81,84,87,89,91,92];

const ACTIVITY = [
  { emoji: "🎴", label: "상황카드 답변", value: 38, delta: "이번 주 +6" },
  { emoji: "🃏", label: "너라면 카드",   value: 12, delta: "이번 주 +3" },
  { emoji: "🏠", label: "관계방 카드",   value: 7,  delta: "이번 주 +2" },
  { emoji: "👥", label: "관계 수",       value: 8,  delta: "변화 없음" },
];

const SETTINGS = [
  { emoji: "🔒", label: "공개 설정",  sub: "내 프로필 공개 범위" },
  { emoji: "🔗", label: "SNS 연동",   sub: "카카오, 인스타 연동" },
  { emoji: "🔔", label: "알림 설정",  sub: "푸시 알림 관리" },
  { emoji: "👤", label: "계정 설정",  sub: "비밀번호, 보안" },
  { emoji: "❓", label: "도움말",     sub: "도움이 필요할 때" },
];

const KEYWORDS = ["따뜻함", "솔직함", "정의로움", "직설적", "감성적", "배려심"];

export default function ProfileScreen() {
  return (
    <div className="pb-6">
      {/* top bar */}
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <h1 className="text-lg font-extrabold text-primary">마이</h1>
        <div className="flex items-center gap-2">
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-card border border-border"><span className="text-base">🔔</span></button>
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-card border border-border"><span className="text-base">⚙️</span></button>
        </div>
      </div>

      {/* character header */}
      <div className="mx-5 mb-4 flex items-start gap-4">
        <div className="relative shrink-0">
          <div className="h-24 w-24 overflow-hidden rounded-xl ring-pink-neon">
            <img src={CHARACTERS[mockProfile.characterId].src} alt="" className="h-full w-full object-cover object-top" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-xl font-extrabold text-primary">{mockProfile.displayName}</p>
            <button className="text-secondary text-sm">✏️</button>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <Badge tone="pink">Lv.{mockProfile.level}</Badge>
            <span className="text-xs text-secondary">1,250 / 2,000 EXP</span>
          </div>
          <ProgressBar value={62.5} tone="cta" height="h-1.5" className="mt-2 max-w-[160px]" />
          <p className="mt-1 text-xs text-secondary">{mockPrimaryArchetype.name_ko} · 솔직하고 발랄한 공감러 💜</p>
          <div className="flex flex-wrap gap-1 mt-2">
            {mockTopTraits.slice(0,4).map((t) => (
              <span key={t} className="text-[11px] rounded-full bg-purple/10 border border-purple/20 px-2 py-0.5 text-purple">#{t}</span>
            ))}
          </div>
        </div>
        {/* accuracy ring */}
        <div className="shrink-0 text-right">
          <div className="relative inline-flex flex-col items-center justify-center h-16 w-16 rounded-full border-4 border-pink shadow-glow-pink">
            <p className="text-lg font-black text-grad-cta leading-none">92<span className="text-xs">%</span></p>
          </div>
          <p className="text-[10px] text-secondary mt-0.5">캐릭터 정확도</p>
        </div>
      </div>

      {/* MING commentary */}
      <div className="mx-5 mb-4">
        <div className="rounded-xl bg-card border border-purple/20 p-4">
          <p className="text-sm font-bold text-pink mb-2">MING이 바라본 요즘 너의 변화 💜</p>
          <div className="flex gap-3">
            <div className="flex-1">
              <p className="text-sm text-primary leading-relaxed">최근 너는 감정을 더 솔직하게 표현하고 있어! 작은 변화들이 너를 더 단단하고 따뜻하게 만들고 있어 ✨</p>
            </div>
            <div className="shrink-0">
              <div className="space-y-1.5">
                <p className="text-[10px] text-secondary font-semibold">최근 변화 TOP 3</p>
                {[["😊","솔직함 상승","↑ 15%","text-green"],["♥","공감 표현 증가","↑ 12%","text-pink"],["🛡","감정 억제 감소","↓ 8%","text-blue"]].map(([e,l,v,c]) => (
                  <div key={String(l)} className="flex items-center gap-2">
                    <span className="text-xs">{e}</span>
                    <p className="text-[11px] text-secondary flex-1">{l}</p>
                    <span className={`text-[11px] font-bold ${c}`}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button className="mt-2 text-xs text-purple">분석 더 보기 ›</button>
        </div>
      </div>

      {/* DNA 5-grid */}
      <div className="mx-5 mb-4 rounded-xl bg-card border border-border p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="font-bold text-primary">나의 성향 DNA</p>
          <button className="text-xs text-purple">성향 분석 자세히 보기 ›</button>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {DNA_TRAITS.map((t) => (
            <StatCard key={t.label} emoji={t.emoji} label={t.label} value={t.value} tone={t.tone} />
          ))}
        </div>
      </div>

      {/* 7-day accuracy line chart */}
      <div className="mx-5 mb-4 rounded-xl bg-card border border-border p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="font-bold text-primary">최근 7일 나의 변화</p>
          <button className="text-xs text-purple">전체 히스토리 ›</button>
        </div>
        <div className="flex items-center justify-between mb-2">
          <Sparkline values={ACCURACY_TREND} width={200} height={60} color="#FF4FDB" />
          <div className="text-right">
            <p className="text-sm text-secondary">캐릭터 정확도</p>
            <p className="text-2xl font-extrabold text-green">+13%</p>
            <p className="text-xs text-secondary">지난 주 대비 상승했어요!</p>
          </div>
        </div>
        <div className="flex justify-between text-[10px] text-tertiary px-1">
          {["6/3","6/4","6/5","6/6","6/7","6/8","오늘"].map(d => <span key={d}>{d}</span>)}
        </div>
      </div>

      {/* activity stats */}
      <div className="mx-5 mb-4 rounded-xl bg-card border border-border p-4">
        <p className="font-bold text-primary mb-3">나의 활동 데이터</p>
        <div className="grid grid-cols-4 gap-2">
          {ACTIVITY.map((a) => (
            <div key={a.label} className="text-center rounded-lg bg-bg border border-border/50 p-2">
              <p className="text-lg mb-0.5">{a.emoji}</p>
              <p className="text-lg font-extrabold text-primary">{a.value}<span className="text-xs">개</span></p>
              <p className="text-[10px] text-secondary">{a.label}</p>
              <p className="text-[9px] text-green mt-0.5">{a.delta}</p>
            </div>
          ))}
        </div>
      </div>

      {/* keyword chips */}
      <div className="mx-5 mb-4 rounded-xl bg-card border border-border p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="font-bold text-primary">나를 표현하는 키워드</p>
          <button className="text-xs text-purple">키워드 편집 ›</button>
        </div>
        <div className="flex flex-wrap gap-2">
          {KEYWORDS.map((k, i) => {
            const tones = ["pink","purple","blue","green","yellow","muted"] as const;
            const icons = ["♥","💬","🛡","⭐","🎵","🎁"];
            return <Badge key={k} tone={tones[i % tones.length]}>{icons[i]} {k}</Badge>;
          })}
        </div>
      </div>

      {/* archetype history */}
      <div className="mx-5 mb-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-extrabold text-primary">진화 히스토리</h2>
        </div>
        <div className="no-scrollbar flex gap-3 overflow-x-auto pb-1">
          {mockEvolutionHistory.map((e) => (
            <div key={e.id} className="shrink-0 w-24">
              <div className="aspect-[3/4] w-full overflow-hidden rounded-lg ring-1 ring-border mb-1">
                <img src={CHARACTERS[e.characterId].src} alt="" className="h-full w-full object-cover object-top" />
              </div>
              <p className="text-[11px] font-bold text-primary">{e.archetypeName}</p>
              <p className="text-[10px] text-tertiary">{e.date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* premium report card */}
      <div className="mx-5 mb-4 rounded-xl bg-card border border-border p-4">
        <div className="flex items-center justify-between mb-1">
          <p className="font-bold text-primary">프리미엄 리포트</p>
          <PremiumLabel />
        </div>
        <p className="text-sm text-secondary mb-3">AI 인간 리포트 · 미래 시뮬레이션 · 심층 궁합</p>
        <button className="w-full rounded-full border border-purple/50 py-2.5 text-sm font-semibold text-purple">리포트 살펴보기</button>
      </div>

      {/* settings grid */}
      <div className="mx-5 grid grid-cols-5 gap-2">
        {SETTINGS.map((s) => (
          <button key={s.label} className="flex flex-col items-center gap-1 rounded-xl bg-card border border-border p-3">
            <span className="text-xl">{s.emoji}</span>
            <p className="text-[11px] font-semibold text-primary text-center">{s.label}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
