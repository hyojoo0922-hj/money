/**
 * MINGLEY Asset Manifest — source of truth for fixed bitmap assets.
 * Mirrors 11_ASSET_LIBRARY.md. Do NOT rename keys or invent new base characters.
 *
 * RULES (locked):
 * - 18 base characters are the only selectable user identities.
 * - MING is the only mascot. Never replace.
 * - BUBBLE_GIRL is an official brand character: onboarding / tutorial /
 *   marketing / empty-state / promo only. NEVER selectable as a user character.
 * - Dynamic UI (badges, frames, point/currency icons, progress) is CSS/SVG,
 *   not listed here.
 */

const C = "/assets/characters";
const G = "/assets/ming";

export type Gender = "female" | "male";
export type CharacterId =
  | "F_A" | "F_B" | "F_C" | "F_D" | "F_E" | "F_F" | "F_G" | "F_H" | "F_I"
  | "M_A" | "M_B" | "M_C" | "M_D" | "M_E" | "M_F" | "M_G" | "M_H" | "M_I";

export const CHARACTERS: Record<CharacterId, { id: CharacterId; gender: Gender; src: string }> = {
  F_A: { id: "F_A", gender: "female", src: `${C}/female/F_A.png` },
  F_B: { id: "F_B", gender: "female", src: `${C}/female/F_B.png` },
  F_C: { id: "F_C", gender: "female", src: `${C}/female/F_C.png` },
  F_D: { id: "F_D", gender: "female", src: `${C}/female/F_D.png` },
  F_E: { id: "F_E", gender: "female", src: `${C}/female/F_E.png` },
  F_F: { id: "F_F", gender: "female", src: `${C}/female/F_F.png` },
  F_G: { id: "F_G", gender: "female", src: `${C}/female/F_G.png` },
  F_H: { id: "F_H", gender: "female", src: `${C}/female/F_H.png` },
  F_I: { id: "F_I", gender: "female", src: `${C}/female/F_I.png` },
  M_A: { id: "M_A", gender: "male", src: `${C}/male/M_A.png` },
  M_B: { id: "M_B", gender: "male", src: `${C}/male/M_B.png` },
  M_C: { id: "M_C", gender: "male", src: `${C}/male/M_C.png` },
  M_D: { id: "M_D", gender: "male", src: `${C}/male/M_D.png` },
  M_E: { id: "M_E", gender: "male", src: `${C}/male/M_E.png` },
  M_F: { id: "M_F", gender: "male", src: `${C}/male/M_F.png` },
  M_G: { id: "M_G", gender: "male", src: `${C}/male/M_G.png` },
  M_H: { id: "M_H", gender: "male", src: `${C}/male/M_H.png` },
  M_I: { id: "M_I", gender: "male", src: `${C}/male/M_I.png` },
};

export const charactersByGender = (g: Gender): CharacterId[] =>
  (Object.keys(CHARACTERS) as CharacterId[]).filter((id) => CHARACTERS[id].gender === g);

/** MING mascot library, grouped per asset library spec. */
export const MING = {
  // emotion
  base: `${G}/emotion/MING_BASE.png`,
  happy: `${G}/emotion/MING_HAPPY.png`,
  love: `${G}/emotion/MING_LOVE.png`,
  thinking: `${G}/emotion/MING_THINKING.png`,
  warning: `${G}/emotion/MING_WARNING.png`,
  report: `${G}/emotion/MING_REPORT.png`,
  success: `${G}/emotion/MING_SUCCESS.png`,
  surprised: `${G}/emotion/MING_SURPRISED.png`,
  coach: `${G}/emotion/MING_COACH.png`,
  sleep: `${G}/emotion/MING_SLEEP.png`,
  hello: `${G}/emotion/MING_HELLO.png`, // bonus asset
  // action
  pointing: `${G}/action/MING_POINTING.png`,
  analyzing: `${G}/action/MING_ANALYZING.png`,
  chat: `${G}/action/MING_CHAT.png`,
  // onboarding
  signup: `${G}/onboarding/MING_SIGNUP.png`,
  firstVisit: `${G}/onboarding/MING_FIRST_VISIT.png`,
  // relationship
  newRelation: `${G}/relationship/MING_NEW_RELATION.png`,
  findFriend: `${G}/relationship/MING_FIND_FRIEND.png`,
  aiDiscovery: `${G}/relationship/MING_AI_DISCOVERY.png`,
  // growth
  levelup: `${G}/growth/MING_LEVELUP.png`,
  evolution: `${G}/growth/MING_EVOLUTION.png`,
  // reward
  achievement: `${G}/reward/MING_ACHIEVEMENT.png`,
  reward: `${G}/reward/MING_REWARD.png`,
  point: `${G}/reward/MING_POINT.png`,
  badge: `${G}/reward/MING_BADGE.png`,
  // work
  analyzingWork: `${G}/work/MING_ANALYZING_WORK.png`,
  creating: `${G}/work/MING_CREATING.png`,
  reportWriting: `${G}/work/MING_REPORT_WRITING.png`,
} as const;

export type MingKey = keyof typeof MING;

/** Official brand character. Restricted usage — never a selectable identity. */
export const BRAND = {
  bubbleGirl: "/assets/brand/BUBBLE_GIRL_BASE.png",
} as const;
