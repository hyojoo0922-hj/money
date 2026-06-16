# MINGLEY Project Brief

## 1. Product Definition

MINGLEY is a relationship-based SNS game where users express themselves through personality, habits, preferences, and relationship answers, then form connections through questions, answers, chemistry points, and character-based relationship previews.

MINGLEY is not a serious dating app.
MINGLEY is not a pure psychology test app.
MINGLEY is not a generic avatar app.

MINGLEY is a fun, social, character-driven relationship game.

The core experience is:

User answers questions
→ personality/archetype is formed
→ character identity appears
→ user connects with recommended or existing relationships
→ questions and answers create relationship chemistry
→ the relationship becomes more interesting over time.

## 2. Core Concept

MINGLEY turns relationship signals into character-based social play.

The app should feel like:

- a cute SNS relationship game
- a personality-based social playground
- a relationship chemistry simulator
- a character-first identity app
- a light but memorable connection experience

The product should feel fun, hip, cute, slightly funny, emotionally expressive, and shareable.

## 3. Identity Principle

Face reveal is optional.

The character is the center of identity.

Users may choose whether to reveal their real face or connect social accounts, but MINGLEY should work even if a user never uploads a face photo.

The character, archetype, labels, answers, chemistry, and relationship interactions should be enough to make the profile feel alive.

## 4. Relationship Types

MINGLEY supports two major relationship paths.

### 1. New Recommended Relationships

Users can discover recommended profiles based on personality, habits, preferences, and chemistry signals.

These recommendations should feel fun and curiosity-driven, not like serious dating matches.

### 2. Existing Real Relationships

Users can register or analyze existing relationships such as:

- romantic partner
- friend
- coworker
- crush
- acquaintance
- family or close relation if later supported

The app can generate relationship previews, chemistry insights, and question flows based on these relationship types.

## 5. Question System

Questions are one of the core mechanics.

MINGLEY should support:

- random question cards
- direct questions
- anonymous or named questions if supported
- question sending
- question answering
- short free-text additions
- reward/point logic after answering

Known product rule:

Random question cards may appear up to 12 times per day.

The question system should feel like a social game, not a survey.

## 6. Character System

MINGLEY is character-driven.

Important known character principles:

- User characters can evolve.
- Evolution may happen around levels.
- Level 5 may trigger a small change.
- Level 10 may trigger AI evolution.
- Users may use points for evolution.
- Each user may have 3–5 evolution stages over time.
- Personality labels or relationship titles can update as the user levels up.

MINGLEY characters should be expressive, memorable, cute, slightly funny, and shareable.

## 7. Known Character / Visual Context

Existing character direction includes:

- Bubblegirl as a main MINGLEY character direction.
- MING as a purple AI coach character.
- User characters are evolution-based.
- Recommended character/profile examples include names like:
  - 유이
  - 연지
  - 아영
  - 준호
  - 현수
  - 남현

Character visuals should not feel generic or boring.
They should feel social, hip, slightly exaggerated, and emotionally expressive.

## 8. Design Tone

MINGLEY design should be:

- hip
- cute
- social
- character-driven
- shareable
- emotionally expressive
- slightly funny
- energetic
- visually memorable

Avoid:

- generic dating app feeling
- overly serious psychology test feeling
- corporate SaaS feeling
- too childish baby style
- flat boring avatar system
- overly polished luxury style
- heavy academic personality report feeling

## 9. Product Success Standard

MINGLEY succeeds when users feel:

- “I want to see my character.”
- “I want to know what type I am.”
- “I want to send this question to someone.”
- “I want to see my chemistry with this person.”
- “This is fun enough to share.”
- “My character feels like me, but more entertaining.”

The app should prioritize emotional engagement and repeat interaction over pure utility.

## 10. Current Known Project Status

As of the latest working state:

- Supabase auth exists.
- Signup/login flow exists.
- User/profile/onboarding flow exists.
- generate-archetype-image previously failed with generation_failed.
- The issue was resolved by redeploying the latest Supabase Edge Function.
- Archetype image generation now succeeds.
- Supabase MCP and Vercel MCP are connected for diagnostics.
- The next phase is MVP stabilization and continued implementation.

Do not reopen the resolved image generation issue unless it fails again.
