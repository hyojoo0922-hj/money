# MINGLEY Development Rules

## 1. Operating Principle

MINGLEY development must follow:

Review
→ Judge
→ Propose
→ Execute

Do not jump directly into broad implementation.

Every change must be scoped, minimal, and tied to the current MVP goal.

## 2. AI Employee Workflow

Use the AI employee workflow whenever possible:

- dispatch-agent for operational checks and diagnostics
- ai-developer for implementation
- ai-qa for scoped review
- ai-designer for visual direction if UI/brand judgment is needed

Default flow:

Issue or task appears
→ dispatch-agent investigates if needed
→ ai-developer proposes scoped fix/implementation
→ Hyojoo approves
→ ai-developer modifies files
→ ai-qa reviews only changed/directly related files
→ Hyojoo approves deploy/commit if needed

## 3. Mode System

Every implementation task must declare one mode:

### BUILD FIX MODE

Use for:

- broken build
- runtime error
- failed API call
- bug fix
- logic failure

Rules:

- fix confirmed issue only
- no new features
- no refactor
- no unrelated UI changes

### FEATURE MODE

Use for:

- adding a scoped feature
- completing an MVP function
- adding one small user flow

Rules:

- implement the smallest working version
- do not expand scope
- do not redesign unrelated screens

### DATABASE MODE

Use for:

- Supabase table changes
- SQL changes
- policies/RLS changes
- storage bucket/policy changes

Rules:

- separate SQL from code changes
- explain order of operations
- ask approval before applying
- no destructive changes without explicit approval

### DEPLOY FIX MODE

Use for:

- Vercel deployment failure
- Supabase function deployment issue
- environment/config deployment mismatch

Rules:

- fix deployment path only
- no new features
- no refactor

### UI FIX MODE

Use for:

- layout issue
- text change
- visual consistency fix
- button/state/spacing issue

Rules:

- only edit relevant UI files
- no business logic change unless required and approved

## 4. Token Discipline

Do not inspect the whole project unless explicitly approved.

Default inspection should be limited to:

- docs/mingley/ project documents
- files named in the task
- directly related dependencies
- error stack referenced files
- changed files for QA

Forbidden phrases/workflows:

- “I will review the whole project”
- “I will scan all files”
- “I will refactor the structure”
- “While I’m here, I’ll also fix…”

If more context is needed, name the exact files needed and ask.

## 5. Resolved Issue Rule

The generate-archetype-image issue is resolved as of the latest known state.

Cause:
The deployed Supabase Edge Function was older than the local source and did not include the latest detail/debug response.

Resolution:
The current function was redeployed to Supabase, after which archetype image generation succeeded.

Rule:
Do not reopen or continue investigating generate-archetype-image unless it fails again.

If it fails again:

1. use dispatch-agent
2. check Supabase logs
3. check Vercel state if relevant
4. capture browser response detail only if needed
5. propose minimal fix
6. do not modify before approval

## 6. Supabase / Vercel Rules

Supabase MCP and Vercel MCP are available for diagnostics.

Allowed without approval:

- read logs
- check function list
- check deployment status
- check read-only metadata
- compare timestamps
- inspect request-level logs

Requires approval:

- deploy Edge Function
- modify database
- run SQL
- change RLS
- change storage policy
- change secrets
- redeploy Vercel
- change environment variables

## 7. Git / Commit Rules

Do not commit unless explicitly instructed.

Before commit, show:

- branch
- staged files
- unstaged files
- commit message

Do not include unrelated files.

If working tree has unrelated changes, leave them untouched.

## 8. QA Rules

After implementation:

AI QA must review only:

- changed files
- directly related files
- affected flow

QA should report:

- PASS / FAIL
- what was checked
- what was not checked
- must-fix issues
- optional notes

QA must not edit code.

## 9. Output Requirements After Implementation

Every implementation report must include:

- mode used
- files modified
- what changed
- build/test result
- known risks
- QA checklist
- whether deploy is required
- whether Supabase action is required

Do not claim success unless verified.

If verification could not be run, say so honestly.

## 10. Current Development Focus

Current phase:

MVP stabilization after successful archetype image generation.

Primary goals:

1. make sure the generated image appears correctly in the app
2. make sure the core user loop works
3. fix Critical bugs first
4. continue implementation in small scoped tasks
5. avoid adding large new systems until MVP is stable
