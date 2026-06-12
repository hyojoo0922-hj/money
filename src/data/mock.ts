/**
 * Static mock data for the Phase 1/2 UI shell ONLY.
 * No Supabase, no AI. Replaced by live data from Phase 4 onward.
 * Raw relationship numbers are never shown to users — see translated copy.
 */
import type { CharacterId } from "@/lib/assets";

export interface MockProfile {
  displayName: string;
  gender: "female" | "male";
  characterId: CharacterId;
  level: number;
  isPremium: boolean;
}

export const mockProfile: MockProfile = {
  displayName: "민지",
  gender: "female",
  characterId: "F_A",
  level: 7,
  isPremium: false,
};

export interface CategoryScore {
  key: string;
  name_ko: string;
  score: number;
}

// 15 category scores (the only personality numbers users see, plus top traits)
export const mockCategoryScores: CategoryScore[] = [
  { key: "empathy", name_ko: "공감", score: 88 },
  { key: "relationship", name_ko: "관계", score: 74 },
  { key: "emotion", name_ko: "감정", score: 65 },
  { key: "anxiety", name_ko: "불안", score: 71 },
  { key: "humor", name_ko: "유머", score: 62 },
  { key: "sociality", name_ko: "사교성", score: 58 },
  { key: "strategy", name_ko: "전략", score: 49 },
  { key: "creativity", name_ko: "창의성", score: 55 },
];

export const mockTopTraits = [
  "경청",
  "배려",
  "관계 집중",
  "감정 읽기",
  "답장 예민",
];

export interface Archetype {
  key: string;
  name_ko: string;
  emoji: string;
  category: string;
}

export const mockPrimaryArchetype: Archetype = {
  key: "reply_overthinker",
  name_ko: "답장망상가",
  emoji: "📱",
  category: "anxiety",
};

export const mockSecondaryArchetypes: Archetype[] = [
  { key: "relationship_weather_forecaster", name_ko: "관계기상캐스터", emoji: "🌦️", category: "anxiety" },
  { key: "social_radar", name_ko: "눈치레이더", emoji: "📡", category: "anxiety" },
];

export interface DailyQuestionCard {
  id: string;
  question: string;
  options: string[];
  weightType: "light" | "behavior" | "life_philosophy" | "core_relationship";
  answered: boolean;
  daysLeft: number;
}

export const mockDailyCards: DailyQuestionCard[] = [
  {
    id: "q1",
    question: "친구가 답장이 늦으면 나는?",
    options: ["별생각 없다", "한 번쯤 확인한다", "이유를 상상한다", "계속 신경 쓰인다"],
    weightType: "behavior",
    answered: false,
    daysLeft: 30,
  },
  {
    id: "q2",
    question: "주말 약속이 갑자기 취소됐다. 첫 감정은?",
    options: ["오히려 좋아", "조금 아쉽다", "서운하다", "무슨 일 있나 걱정된다"],
    weightType: "behavior",
    answered: false,
    daysLeft: 28,
  },
  {
    id: "q3",
    question: "처음 만난 모임에서 나는 보통?",
    options: ["내가 분위기를 띄운다", "편한 한두 명과 논다", "조용히 관찰한다", "빨리 집에 가고 싶다"],
    weightType: "behavior",
    answered: true,
    daysLeft: 25,
  },
  {
    id: "q4",
    question: "중요한 결정을 앞두고 나는?",
    options: ["일단 저지른다", "리스트를 적는다", "주변에 물어본다", "밤새 시뮬레이션한다"],
    weightType: "life_philosophy",
    answered: false,
    daysLeft: 30,
  },
];

export interface RelationshipItem {
  id: string;
  name: string;
  type: "real" | "cyber";
  characterId: CharacterId;
  temperatureLabel: string; // translated, never a raw number
  levelLabel: string;
  insight: string;
  chatUnlocked: boolean;
  exchangeCount: number;
}

export const mockRelationships: RelationshipItem[] = [
  {
    id: "r1",
    name: "지호",
    type: "real",
    characterId: "M_C",
    temperatureLabel: "조금씩 가까워지는 중",
    levelLabel: "마음 트는 사이",
    insight: "요즘 둘 다 질문을 자주 주고받고 있어. 관계가 안정되는 신호야.",
    chatUnlocked: true,
    exchangeCount: 24,
  },
  {
    id: "r2",
    name: "서윤",
    type: "real",
    characterId: "F_E",
    temperatureLabel: "잠시 식은 듯",
    levelLabel: "아는 사이",
    insight: "한동안 교류가 뜸했네. 가벼운 질문 하나면 다시 데워질지도.",
    chatUnlocked: false,
    exchangeCount: 8,
  },
  {
    id: "r3",
    name: "익명의 J",
    type: "cyber",
    characterId: "M_G",
    temperatureLabel: "막 알아가는 단계",
    levelLabel: "첫 질문 교환",
    insight: "성향이 묘하게 잘 맞아. 질문을 더 나눠보면 재밌을 거야.",
    chatUnlocked: false,
    exchangeCount: 3,
  },
];

export interface Recommendation {
  id: string;
  name: string;
  characterId: CharacterId;
  reason: string;
}

export const mockRecommendations: Recommendation[] = [
  { id: "rec1", name: "익명의 K", characterId: "F_H", reason: "공감과 감정 표현이 너랑 닮았어" },
  { id: "rec2", name: "익명의 P", characterId: "M_B", reason: "너의 불안을 차분하게 받아줄 성향이야" },
  { id: "rec3", name: "익명의 L", characterId: "F_C", reason: "유머 코드가 잘 맞을 것 같아" },
];

export interface EvolutionEntry {
  id: string;
  date: string;
  archetypeName: string;
  characterId: CharacterId;
}

export const mockEvolutionHistory: EvolutionEntry[] = [
  { id: "e1", date: "2026.05.30", archetypeName: "답장망상가", characterId: "F_A" },
  { id: "e2", date: "2026.05.12", archetypeName: "감정폭주기관차", characterId: "F_A" },
  { id: "e3", date: "2026.04.28", archetypeName: "인간엑셀", characterId: "F_A" },
];
