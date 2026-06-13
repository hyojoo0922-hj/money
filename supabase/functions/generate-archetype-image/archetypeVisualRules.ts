export interface ArchetypeVisualRule {
  archetype_key:  string;
  name_ko:        string;
  pose:           string;
  expression:     string;
  outfit:         string;
  accessories:    string;
  background:     string;
  color_accents:  string;
  mood:           string;
  prompt_version: string;
}

export const ARCHETYPE_VISUAL_RULES: Record<string, ArchetypeVisualRule> = {
  reply_overthinker: {
    archetype_key:  "reply_overthinker",
    name_ko:        "답장망상가",
    pose:           "sitting slightly hunched forward, both hands holding a glowing smartphone up near chest, shoulders raised with tension, body language anxious and hyper-focused",
    expression:     "wide eyes fixed on the phone screen, brows slightly furrowed with worry, mouth slightly open in anxious anticipation",
    outfit:         "oversized dark navy or deep purple hoodie, casual shorts, indoor socks — disheveled but cozy, the look of someone who has not left the room",
    accessories:    "glowing smartphone screen showing notification badge, one small earbud in, slightly messy hair bun or loose hair",
    background:     "dark bedroom atmosphere, soft floating notification bubbles around head rendered as translucent icons, faint clock showing late hour, minimal and moody",
    color_accents:  "electric blue phone glow, purple-indigo atmospheric haze, soft pink notification dots",
    mood:           "anxious anticipation, hyper-alert, isolated, cannot put the phone down",
    prompt_version: "v1",
  },
  human_excel: {
    archetype_key:  "human_excel",
    name_ko:        "인간엑셀",
    pose:           "upright confident seated posture at a clean desk, one hand on keyboard or stylus, other hand gesturing precisely — purposeful and controlled",
    expression:     "calm focused gaze, slight satisfied smirk, eyes sharp and calculating — someone who already knows the answer",
    outfit:         "neat smart-casual structured blazer or button-up over simple tee, clean and pressed, everything deliberate — no wrinkles, no chaos",
    accessories:    "thin minimalist watch on wrist, tablet or laptop open showing data charts, small color-coded notepad with bullet points",
    background:     "clean minimal desk environment, floating translucent data windows and charts as soft props, small potted plant as single decoration, organized and serene",
    color_accents:  "cool blues and greens, crisp white highlights, accent yellow for data points",
    mood:           "controlled, efficient, quietly satisfied, slightly superior — completely in their element",
    prompt_version: "v1",
  },
  emotion_locomotive: {
    archetype_key:  "emotion_locomotive",
    name_ko:        "감정폭주기관차",
    pose:           "standing or leaning forward dynamically, one arm extended outward expressively, body turned mid-motion with energy radiating outward — fully in the feeling",
    expression:     "eyebrows raised high with intensity, eyes bright and passionate, mouth open in expressive speech or full laughter — everything at maximum volume",
    outfit:         "expressive layered look: bold colored jacket or dramatic outer layer over simple base, vivid and intentional — dressed with feeling not logic",
    accessories:    "headphones around neck not in ears, small charm or meaningful pin on jacket, hair loose or wind-blown from the emotional intensity",
    background:     "swirling soft abstract emotion waves behind them, warm gradient atmosphere, small floating symbols of passion such as flame heartbeat line and music notes rendered softly",
    color_accents:  "warm reds, deep oranges, hot pinks — saturated and vivid, high energy",
    mood:           "passionate, overwhelming, magnetic, consuming — everything felt at maximum",
    prompt_version: "v1",
  },
  relationship_weather_caster: {
    archetype_key:  "relationship_weather_caster",
    name_ko:        "관계기상캐스터",
    pose:           "slightly sideways observant stance, head tilted thoughtfully, one hand raised near chin in a considering gesture, eyes scanning and reading the atmosphere around them",
    expression:     "soft thoughtful brow slightly furrowed with empathic concern, gentle sympathetic eyes, mouth in a careful considering expression — always processing others",
    outfit:         "layered soft clothing: cardigan or light trench coat over soft inner layers, the kind of person always prepared for emotional weather changes, warm and approachable",
    accessories:    "small weather-themed detail such as cloud earring or pin, compact umbrella tucked under arm or nearby, small journal visible in hand or pocket",
    background:     "soft sky gradient behind with mixed weather symbols such as sun clouds and gentle rain rendered as soft floating icons, emotional weather map suggested in background",
    color_accents:  "soft grey-blues, lavender, muted yellows — the palette of a sky about to shift",
    mood:           "perceptive, empathetic, slightly anxious about others, always scanning — a caring forecaster carrying the weight of the room",
    prompt_version: "v1",
  },
};

export function buildArchetypePrompt(
  rule: ArchetypeVisualRule,
  _characterId: string,
): string {
  return [
    "A stylized 3D semi-realistic game character portrait in the same art style as the reference image.",
    "The character is the same person as in the reference image — identical face structure, eye shape, skin tone, and body proportions. Do not change the face.",
    `Pose: ${rule.pose}.`,
    `Facial expression: ${rule.expression}.`,
    `Outfit: ${rule.outfit}.`,
    `Accessories and details: ${rule.accessories}.`,
    `Background and props: ${rule.background}.`,
    `Color accent palette: ${rule.color_accents}.`,
    `Overall emotional mood: ${rule.mood}.`,
    "Portrait orientation. Character fills approximately 70% of the canvas height. Soft studio lighting. Transparent or minimal background. High quality, consistent with the reference character art direction.",
  ].join(" ");
}

