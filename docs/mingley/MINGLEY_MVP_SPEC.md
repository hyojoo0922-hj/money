# MINGLEY MVP Spec

## 1. MVP Goal

The MVP goal is to make MINGLEY usable as a simple but compelling character-based relationship SNS game.

The MVP should allow a user to:

1. sign up or log in
2. complete onboarding
3. generate or receive a character/archetype
4. see their home/profile state
5. view recommended profiles
6. send or answer questions
7. receive points/tickets
8. navigate the app without breaking
9. understand what to do next

MVP does not need to include every future social/game mechanic.
It should prove the core loop.

## 2. Core MVP Loop

The core MVP loop is:

User joins
→ answers onboarding questions
→ receives archetype / character identity
→ sees recommended relationship profiles or relationship actions
→ sends/answers questions
→ gains points or chemistry
→ returns to see updated relationship/character state.

## 3. MVP Feature List

### Auth

Required:

- Sign up
- Login
- Logout
- Persisted session
- Safe handling of unauthenticated state

### Onboarding

Required:

- Gender selection
- Age input
- Common 5 questions
- Optional additional questions if already supported
- Onboarding completion state
- Save onboarding results to Supabase

### Archetype / Character

Required:

- Generate or assign user archetype
- Generate archetype image
- Save generated image URL
- Display generated archetype image in the user-facing flow
- Do not regenerate unnecessarily if image already exists unless user intentionally requests it

Current status:

- Archetype image generation now succeeds after Edge Function redeploy.

### Home

Required:

- Show user state clearly
- Show character/archetype
- Show chemistry/points/tickets if supported
- Show clear next action
- Show recommended profiles or relationship entry points

### Recommended Profiles

Required:

- Display recommended profiles/cards
- Profile card should feel character/social driven
- User can select or view profile details if implemented

### Relationship List

Required:

- Show existing or created relationships
- Allow relationship preview or entry point
- Should not feel empty/confusing if no relationships exist

### Question Sending

Required:

- User can send a question if feature exists
- Question target should be clear
- Anonymous/named option only if already in current scope
- Prevent confusing duplicate sends

### Question Answering

Required:

- User can answer received or random questions
- Support short free-text addition if already scoped
- Award points/chemistry if logic exists

### Points / Tickets

Required:

- Ticket consumption for image generation if already implemented
- Refund on failed image generation
- Point/ticket state should not silently desync
- If a paid/limited action fails, user should not lose value unfairly

### Profile / My Page

Required:

- User can view profile
- User can see or edit basic info if implemented
- Face reveal remains optional

### Navigation

Required:

- All primary tabs/routes work
- No broken navigation dead ends
- Loading/error/empty states are understandable

## 4. Must-Not-Add Yet

Do not add these unless explicitly approved:

- full dating app mechanics
- complex real-time chat
- payment system
- heavy personality report engine
- large social feed
- complex ranking/matching algorithm
- advanced AI analysis beyond MVP
- new image-generation features beyond current archetype flow
- major redesign
- large refactor

## 5. MVP Stabilization Priority

After archetype image generation success, next priorities should be:

1. Confirm generated archetype image displays correctly in the app.
2. Confirm tickets/points do not break after successful generation.
3. Confirm onboarding completion routes the user correctly.
4. Confirm home/profile state reflects generated archetype.
5. Confirm recommended profile and relationship flows are usable.
6. Confirm question sending/answering works end-to-end.
7. Fix Critical bugs only before adding new features.

## 6. Definition of Done for MVP Stabilization

MVP stabilization is complete when:

- a new user can sign up
- complete onboarding
- generate or receive archetype image
- land on home
- understand next action
- view recommended profiles
- send or answer at least one question
- see points/tickets state
- navigate without breaking
- no Critical bug remains in the core loop

## 7. Product Quality Standard

MINGLEY should feel:

- playful but clear
- cute but not childish
- social but not desperate
- relationship-focused but not heavy
- character-first but still usable
- emotional but not overly serious

If a feature makes the product feel like a generic dating app, serious psychology test, or boring avatar app, it should be reconsidered.
