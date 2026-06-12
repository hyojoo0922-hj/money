/**
 * MINGLEY Personality Taxonomy — 15 categories x 10 traits = 150 traits.
 * Source: 03_PERSONALITY_ENGINE.md. Score range 0~100, dynamic (up & down).
 * Keys match question_options.trait_effects format (e.g. "empathy_listening").
 * This file is the master list seeded into `personality_traits`.
 */

export interface PersonalityCategory {
  key: string;
  name_ko: string;
  name_en: string;
}

export interface PersonalityTrait {
  trait_key: string;
  category_key: string;
  name_ko: string;
  name_en: string;
}

export const CATEGORIES: PersonalityCategory[] = [
  { key: "empathy", name_ko: "공감", name_en: "Empathy" },
  { key: "relationship", name_ko: "관계", name_en: "Relationship" },
  { key: "emotion", name_ko: "감정", name_en: "Emotion" },
  { key: "independence", name_ko: "독립성", name_en: "Independence" },
  { key: "strategy", name_ko: "전략", name_en: "Strategy" },
  { key: "humor", name_ko: "유머", name_en: "Humor" },
  { key: "challenge", name_ko: "도전", name_en: "Challenge" },
  { key: "responsibility", name_ko: "책임감", name_en: "Responsibility" },
  { key: "obsession", name_ko: "집착", name_en: "Obsession" },
  { key: "anxiety", name_ko: "불안", name_en: "Anxiety" },
  { key: "attention", name_ko: "관심추구", name_en: "Attention" },
  { key: "self_esteem", name_ko: "자존감", name_en: "Self-Esteem" },
  { key: "discipline", name_ko: "절제", name_en: "Discipline" },
  { key: "creativity", name_ko: "창의성", name_en: "Creativity" },
  { key: "sociality", name_ko: "사교성", name_en: "Sociality" },
];

export const TRAITS: PersonalityTrait[] = [
  // 1. Empathy
  { trait_key: "empathy_listening", category_key: "empathy", name_ko: "경청", name_en: "Listening" },
  { trait_key: "empathy_consideration", category_key: "empathy", name_ko: "배려", name_en: "Consideration" },
  { trait_key: "empathy_emotional_reading", category_key: "empathy", name_ko: "감정 읽기", name_en: "Emotional Reading" },
  { trait_key: "empathy_comfort", category_key: "empathy", name_ko: "위로", name_en: "Comfort Giving" },
  { trait_key: "empathy_perspective_taking", category_key: "empathy", name_ko: "역지사지", name_en: "Perspective Taking" },
  { trait_key: "empathy_warmth", category_key: "empathy", name_ko: "따뜻함", name_en: "Warmth" },
  { trait_key: "empathy_patience", category_key: "empathy", name_ko: "인내심", name_en: "Patience" },
  { trait_key: "empathy_acceptance", category_key: "empathy", name_ko: "수용", name_en: "Acceptance" },
  { trait_key: "empathy_supportiveness", category_key: "empathy", name_ko: "지지", name_en: "Supportiveness" },
  { trait_key: "empathy_sensitivity", category_key: "empathy", name_ko: "섬세함", name_en: "Sensitivity" },
  // 2. Relationship
  { trait_key: "relationship_focus", category_key: "relationship", name_ko: "관계 집중", name_en: "Relationship Focus" },
  { trait_key: "relationship_loyalty", category_key: "relationship", name_ko: "의리", name_en: "Loyalty" },
  { trait_key: "relationship_trust", category_key: "relationship", name_ko: "신뢰", name_en: "Trust" },
  { trait_key: "relationship_communication", category_key: "relationship", name_ko: "소통", name_en: "Communication" },
  { trait_key: "relationship_boundaries", category_key: "relationship", name_ko: "경계 설정", name_en: "Boundaries" },
  { trait_key: "relationship_initiative", category_key: "relationship", name_ko: "먼저 다가가기", name_en: "Initiative" },
  { trait_key: "relationship_depth", category_key: "relationship", name_ko: "관계 깊이", name_en: "Depth" },
  { trait_key: "relationship_conflict_repair", category_key: "relationship", name_ko: "관계 회복", name_en: "Conflict Repair" },
  { trait_key: "relationship_reliability", category_key: "relationship", name_ko: "한결같음", name_en: "Reliability" },
  { trait_key: "relationship_community", category_key: "relationship", name_ko: "공동체 지향", name_en: "Community Orientation" },
  // 3. Emotion
  { trait_key: "emotion_intensity", category_key: "emotion", name_ko: "감정 강도", name_en: "Emotional Intensity" },
  { trait_key: "emotion_expression", category_key: "emotion", name_ko: "감정 표현", name_en: "Expression" },
  { trait_key: "emotion_volatility", category_key: "emotion", name_ko: "감정 기복", name_en: "Volatility" },
  { trait_key: "emotion_sentimentality", category_key: "emotion", name_ko: "감성", name_en: "Sentimentality" },
  { trait_key: "emotion_passion", category_key: "emotion", name_ko: "열정", name_en: "Passion" },
  { trait_key: "emotion_nostalgia", category_key: "emotion", name_ko: "추억 집착", name_en: "Nostalgia" },
  { trait_key: "emotion_romanticism", category_key: "emotion", name_ko: "낭만", name_en: "Romanticism" },
  { trait_key: "emotion_melancholy", category_key: "emotion", name_ko: "센치함", name_en: "Melancholy" },
  { trait_key: "emotion_empathic_overflow", category_key: "emotion", name_ko: "감정 몰입", name_en: "Emotional Immersion" },
  { trait_key: "emotion_mood_awareness", category_key: "emotion", name_ko: "기분 인식", name_en: "Mood Awareness" },
  // 4. Independence
  { trait_key: "independence_autonomy", category_key: "independence", name_ko: "자율성", name_en: "Autonomy" },
  { trait_key: "independence_solo_comfort", category_key: "independence", name_ko: "혼자 잘 지냄", name_en: "Solo Comfort" },
  { trait_key: "independence_self_reliance", category_key: "independence", name_ko: "자립", name_en: "Self-Reliance" },
  { trait_key: "independence_decision_solo", category_key: "independence", name_ko: "독립적 결정", name_en: "Independent Decision" },
  { trait_key: "independence_space_need", category_key: "independence", name_ko: "거리감 선호", name_en: "Need for Space" },
  { trait_key: "independence_self_direction", category_key: "independence", name_ko: "자기주도", name_en: "Self-Direction" },
  { trait_key: "independence_freedom_value", category_key: "independence", name_ko: "자유 추구", name_en: "Freedom Valuing" },
  { trait_key: "independence_emotional_self", category_key: "independence", name_ko: "감정 자급", name_en: "Emotional Self-Sufficiency" },
  { trait_key: "independence_nonconformity", category_key: "independence", name_ko: "비순응", name_en: "Nonconformity" },
  { trait_key: "independence_boundary_strength", category_key: "independence", name_ko: "단호함", name_en: "Boundary Strength" },
  // 5. Strategy
  { trait_key: "strategy_planning", category_key: "strategy", name_ko: "계획성", name_en: "Planning" },
  { trait_key: "strategy_efficiency", category_key: "strategy", name_ko: "효율 추구", name_en: "Efficiency" },
  { trait_key: "strategy_analysis", category_key: "strategy", name_ko: "분석력", name_en: "Analysis" },
  { trait_key: "strategy_foresight", category_key: "strategy", name_ko: "예측", name_en: "Foresight" },
  { trait_key: "strategy_organization", category_key: "strategy", name_ko: "정리정돈", name_en: "Organization" },
  { trait_key: "strategy_risk_management", category_key: "strategy", name_ko: "리스크 관리", name_en: "Risk Management" },
  { trait_key: "strategy_prioritization", category_key: "strategy", name_ko: "우선순위", name_en: "Prioritization" },
  { trait_key: "strategy_data_driven", category_key: "strategy", name_ko: "데이터 기반", name_en: "Data-Driven" },
  { trait_key: "strategy_optimization", category_key: "strategy", name_ko: "최적화", name_en: "Optimization" },
  { trait_key: "strategy_conclusion_first", category_key: "strategy", name_ko: "결론 우선", name_en: "Conclusion-First" },
  // 6. Humor
  { trait_key: "humor_wit", category_key: "humor", name_ko: "위트", name_en: "Wit" },
  { trait_key: "humor_playfulness", category_key: "humor", name_ko: "장난기", name_en: "Playfulness" },
  { trait_key: "humor_self_deprecation", category_key: "humor", name_ko: "자기 디스", name_en: "Self-Deprecation" },
  { trait_key: "humor_timing", category_key: "humor", name_ko: "드립 타이밍", name_en: "Comic Timing" },
  { trait_key: "humor_sarcasm", category_key: "humor", name_ko: "능청", name_en: "Sarcasm" },
  { trait_key: "humor_lightness", category_key: "humor", name_ko: "분위기 메이커", name_en: "Lightness" },
  { trait_key: "humor_meme_fluency", category_key: "humor", name_ko: "밈 감각", name_en: "Meme Fluency" },
  { trait_key: "humor_observational", category_key: "humor", name_ko: "관찰 개그", name_en: "Observational Humor" },
  { trait_key: "humor_silliness", category_key: "humor", name_ko: "엉뚱함", name_en: "Silliness" },
  { trait_key: "humor_tension_relief", category_key: "humor", name_ko: "긴장 완화", name_en: "Tension Relief" },
  // 7. Challenge
  { trait_key: "challenge_ambition", category_key: "challenge", name_ko: "야망", name_en: "Ambition" },
  { trait_key: "challenge_courage", category_key: "challenge", name_ko: "용기", name_en: "Courage" },
  { trait_key: "challenge_novelty_seeking", category_key: "challenge", name_ko: "새로움 추구", name_en: "Novelty Seeking" },
  { trait_key: "challenge_risk_taking", category_key: "challenge", name_ko: "모험심", name_en: "Risk-Taking" },
  { trait_key: "challenge_growth_drive", category_key: "challenge", name_ko: "성장욕", name_en: "Growth Drive" },
  { trait_key: "challenge_resilience", category_key: "challenge", name_ko: "회복탄력성", name_en: "Resilience" },
  { trait_key: "challenge_competitiveness", category_key: "challenge", name_ko: "승부욕", name_en: "Competitiveness" },
  { trait_key: "challenge_initiative", category_key: "challenge", name_ko: "추진력", name_en: "Drive" },
  { trait_key: "challenge_curiosity", category_key: "challenge", name_ko: "호기심", name_en: "Curiosity" },
  { trait_key: "challenge_persistence", category_key: "challenge", name_ko: "끈기", name_en: "Persistence" },
  // 8. Responsibility
  { trait_key: "responsibility_reliability", category_key: "responsibility", name_ko: "신뢰성", name_en: "Reliability" },
  { trait_key: "responsibility_diligence", category_key: "responsibility", name_ko: "성실함", name_en: "Diligence" },
  { trait_key: "responsibility_commitment", category_key: "responsibility", name_ko: "약속 이행", name_en: "Commitment" },
  { trait_key: "responsibility_ownership", category_key: "responsibility", name_ko: "주인의식", name_en: "Ownership" },
  { trait_key: "responsibility_punctuality", category_key: "responsibility", name_ko: "시간 약속", name_en: "Punctuality" },
  { trait_key: "responsibility_care_for_others", category_key: "responsibility", name_ko: "챙김", name_en: "Care for Others" },
  { trait_key: "responsibility_accountability", category_key: "responsibility", name_ko: "책임 인정", name_en: "Accountability" },
  { trait_key: "responsibility_dependability", category_key: "responsibility", name_ko: "든든함", name_en: "Dependability" },
  { trait_key: "responsibility_follow_through", category_key: "responsibility", name_ko: "마무리", name_en: "Follow-Through" },
  { trait_key: "responsibility_duty", category_key: "responsibility", name_ko: "의무감", name_en: "Sense of Duty" },
  // 9. Obsession
  { trait_key: "obsession_detail_fixation", category_key: "obsession", name_ko: "디테일 집착", name_en: "Detail Fixation" },
  { trait_key: "obsession_perfectionism", category_key: "obsession", name_ko: "완벽주의", name_en: "Perfectionism" },
  { trait_key: "obsession_control", category_key: "obsession", name_ko: "통제욕", name_en: "Control" },
  { trait_key: "obsession_rumination", category_key: "obsession", name_ko: "곱씹기", name_en: "Rumination" },
  { trait_key: "obsession_collecting", category_key: "obsession", name_ko: "수집욕", name_en: "Collecting" },
  { trait_key: "obsession_routine_rigidity", category_key: "obsession", name_ko: "루틴 고집", name_en: "Routine Rigidity" },
  { trait_key: "obsession_overcommitment", category_key: "obsession", name_ko: "과몰입", name_en: "Overcommitment" },
  { trait_key: "obsession_tracking", category_key: "obsession", name_ko: "기록 집착", name_en: "Tracking" },
  { trait_key: "obsession_cleanliness", category_key: "obsession", name_ko: "결벽", name_en: "Cleanliness" },
  { trait_key: "obsession_finishing_urge", category_key: "obsession", name_ko: "끝맺음 강박", name_en: "Completion Urge" },
  // 10. Anxiety
  { trait_key: "anxiety_reply_sensitivity", category_key: "anxiety", name_ko: "답장 예민", name_en: "Reply Sensitivity" },
  { trait_key: "anxiety_overthinking", category_key: "anxiety", name_ko: "과한 생각", name_en: "Overthinking" },
  { trait_key: "anxiety_future_worry", category_key: "anxiety", name_ko: "미래 걱정", name_en: "Future Worry" },
  { trait_key: "anxiety_rejection_fear", category_key: "anxiety", name_ko: "거절 두려움", name_en: "Rejection Fear" },
  { trait_key: "anxiety_meaning_reading", category_key: "anxiety", name_ko: "의미 부여", name_en: "Meaning Reading" },
  { trait_key: "anxiety_scenario_simulation", category_key: "anxiety", name_ko: "시나리오 상상", name_en: "Scenario Simulation" },
  { trait_key: "anxiety_uncertainty_discomfort", category_key: "anxiety", name_ko: "불확실 불편", name_en: "Uncertainty Discomfort" },
  { trait_key: "anxiety_validation_need", category_key: "anxiety", name_ko: "확인 욕구", name_en: "Validation Need" },
  { trait_key: "anxiety_social_radar", category_key: "anxiety", name_ko: "눈치 레이더", name_en: "Social Radar" },
  { trait_key: "anxiety_emotional_forecasting", category_key: "anxiety", name_ko: "감정 예보", name_en: "Emotional Forecasting" },
  // 11. Attention
  { trait_key: "attention_spotlight_seeking", category_key: "attention", name_ko: "주목 욕구", name_en: "Spotlight Seeking" },
  { trait_key: "attention_sharing_urge", category_key: "attention", name_ko: "공유 욕구", name_en: "Sharing Urge" },
  { trait_key: "attention_reaction_craving", category_key: "attention", name_ko: "리액션 갈망", name_en: "Reaction Craving" },
  { trait_key: "attention_self_display", category_key: "attention", name_ko: "자기 표현", name_en: "Self-Display" },
  { trait_key: "attention_recognition_need", category_key: "attention", name_ko: "인정 욕구", name_en: "Recognition Need" },
  { trait_key: "attention_storytelling", category_key: "attention", name_ko: "썰 풀기", name_en: "Storytelling" },
  { trait_key: "attention_main_character", category_key: "attention", name_ko: "주인공 기질", name_en: "Main Character" },
  { trait_key: "attention_feedback_sensitivity", category_key: "attention", name_ko: "반응 민감", name_en: "Feedback Sensitivity" },
  { trait_key: "attention_presence", category_key: "attention", name_ko: "존재감", name_en: "Presence" },
  { trait_key: "attention_trend_following", category_key: "attention", name_ko: "트렌드 추종", name_en: "Trend Following" },
  // 12. Self-Esteem
  { trait_key: "self_esteem_confidence", category_key: "self_esteem", name_ko: "자신감", name_en: "Confidence" },
  { trait_key: "self_esteem_self_worth", category_key: "self_esteem", name_ko: "자기 가치", name_en: "Self-Worth" },
  { trait_key: "self_esteem_self_acceptance", category_key: "self_esteem", name_ko: "자기 수용", name_en: "Self-Acceptance" },
  { trait_key: "self_esteem_stability", category_key: "self_esteem", name_ko: "정서 안정", name_en: "Stability" },
  { trait_key: "self_esteem_self_belief", category_key: "self_esteem", name_ko: "자기 믿음", name_en: "Self-Belief" },
  { trait_key: "self_esteem_resilient_pride", category_key: "self_esteem", name_ko: "건강한 자부심", name_en: "Healthy Pride" },
  { trait_key: "self_esteem_independence_from_approval", category_key: "self_esteem", name_ko: "인정 무관", name_en: "Approval Independence" },
  { trait_key: "self_esteem_body_comfort", category_key: "self_esteem", name_ko: "자기 편안함", name_en: "Self-Comfort" },
  { trait_key: "self_esteem_assertiveness", category_key: "self_esteem", name_ko: "자기 주장", name_en: "Assertiveness" },
  { trait_key: "self_esteem_optimism", category_key: "self_esteem", name_ko: "낙관", name_en: "Optimism" },
  // 13. Discipline
  { trait_key: "discipline_self_control", category_key: "discipline", name_ko: "자기 통제", name_en: "Self-Control" },
  { trait_key: "discipline_consistency", category_key: "discipline", name_ko: "꾸준함", name_en: "Consistency" },
  { trait_key: "discipline_focus", category_key: "discipline", name_ko: "집중력", name_en: "Focus" },
  { trait_key: "discipline_delayed_gratification", category_key: "discipline", name_ko: "절제력", name_en: "Delayed Gratification" },
  { trait_key: "discipline_routine", category_key: "discipline", name_ko: "루틴", name_en: "Routine" },
  { trait_key: "discipline_willpower", category_key: "discipline", name_ko: "의지력", name_en: "Willpower" },
  { trait_key: "discipline_moderation", category_key: "discipline", name_ko: "중용", name_en: "Moderation" },
  { trait_key: "discipline_habit_strength", category_key: "discipline", name_ko: "습관 형성", name_en: "Habit Strength" },
  { trait_key: "discipline_time_management", category_key: "discipline", name_ko: "시간 관리", name_en: "Time Management" },
  { trait_key: "discipline_restraint", category_key: "discipline", name_ko: "참을성", name_en: "Restraint" },
  // 14. Creativity
  { trait_key: "creativity_imagination", category_key: "creativity", name_ko: "상상력", name_en: "Imagination" },
  { trait_key: "creativity_originality", category_key: "creativity", name_ko: "독창성", name_en: "Originality" },
  { trait_key: "creativity_idea_generation", category_key: "creativity", name_ko: "아이디어", name_en: "Idea Generation" },
  { trait_key: "creativity_aesthetic_sense", category_key: "creativity", name_ko: "심미안", name_en: "Aesthetic Sense" },
  { trait_key: "creativity_expression", category_key: "creativity", name_ko: "표현력", name_en: "Expression" },
  { trait_key: "creativity_experimentation", category_key: "creativity", name_ko: "실험 정신", name_en: "Experimentation" },
  { trait_key: "creativity_storymaking", category_key: "creativity", name_ko: "이야기 짓기", name_en: "Story-Making" },
  { trait_key: "creativity_curiosity", category_key: "creativity", name_ko: "탐구심", name_en: "Inquisitiveness" },
  { trait_key: "creativity_unconventional", category_key: "creativity", name_ko: "틀 깨기", name_en: "Unconventional Thinking" },
  { trait_key: "creativity_resourcefulness", category_key: "creativity", name_ko: "임기응변", name_en: "Resourcefulness" },
  // 15. Sociality
  { trait_key: "sociality_extraversion", category_key: "sociality", name_ko: "외향성", name_en: "Extraversion" },
  { trait_key: "sociality_friendliness", category_key: "sociality", name_ko: "친화력", name_en: "Friendliness" },
  { trait_key: "sociality_networking", category_key: "sociality", name_ko: "인맥 관리", name_en: "Networking" },
  { trait_key: "sociality_approachability", category_key: "sociality", name_ko: "다가가기 쉬움", name_en: "Approachability" },
  { trait_key: "sociality_group_energy", category_key: "sociality", name_ko: "모임 에너지", name_en: "Group Energy" },
  { trait_key: "sociality_small_talk", category_key: "sociality", name_ko: "스몰토크", name_en: "Small Talk" },
  { trait_key: "sociality_inclusiveness", category_key: "sociality", name_ko: "포용", name_en: "Inclusiveness" },
  { trait_key: "sociality_initiating_contact", category_key: "sociality", name_ko: "연락 주도", name_en: "Initiating Contact" },
  { trait_key: "sociality_adaptability", category_key: "sociality", name_ko: "상황 적응", name_en: "Social Adaptability" },
  { trait_key: "sociality_openness", category_key: "sociality", name_ko: "개방성", name_en: "Openness" },
];

export const TRAITS_BY_CATEGORY = (categoryKey: string): PersonalityTrait[] =>
  TRAITS.filter((t) => t.category_key === categoryKey);
