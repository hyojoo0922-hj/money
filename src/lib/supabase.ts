import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/**
 * Supabase client — null when env vars are absent (local mock-only mode).
 * Always check for null before calling; the app must work without Supabase.
 */
export const supabase = url && key ? createClient(url, key) : null;

export const isSupabaseAvailable = (): boolean => supabase !== null;

/**
 * bootstrapAuth — call once on app startup (fire-and-forget).
 *
 * Flow:
 *   1. Check localStorage for an existing session — reuse it if valid.
 *   2. If no session, call signInAnonymously() to create a persistent anon user.
 *   3. Upsert a profiles row for the auth user.
 *      ignoreDuplicates: true — never overwrites an existing row,
 *      so ticket balance and character selection are always preserved.
 *
 * Silent no-op if Supabase env vars are absent.
 */
export async function bootstrapAuth(): Promise<void> {
  if (!supabase) return;

  try {
    // ── Step 1: restore existing session ──────────────────────────────
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
      console.warn("[MINGLEY] getSession error:", sessionError.message);
    }

    let userId = session?.user?.id ?? null;

    // ── Step 2: sign in anonymously if no valid session ────────────────
    if (!userId) {
      const { data: anonData, error: anonError } =
        await supabase.auth.signInAnonymously();

      if (anonError || !anonData.user) {
        // Non-fatal — app still works in mock-only mode
        console.warn(
          "[MINGLEY] signInAnonymously failed:",
          anonError?.message ?? "no user returned",
        );
        return;
      }

      userId = anonData.user.id;
    }

    // ── Step 3: ensure profiles row exists ────────────────────────────
    // ignoreDuplicates: true means this is a true "create if missing" —
    // an existing row with any value (including tickets = 0) is never touched.
    const { error: profileError } = await supabase.from("profiles").upsert(
      {
        user_id:            userId,
        character_id:       "F_A",          // default; overwritten by onboarding later
        display_name:       "버블걸",        // default display name
        level:              1,
        evolution_tickets:  2,
        total_tickets_used: 0,
      },
      {
        onConflict:       "user_id",
        ignoreDuplicates: true,
      },
    );

    if (profileError) {
      console.warn("[MINGLEY] profiles upsert failed:", profileError.message);
    }
  } catch (err) {
    // Catch-all — network down, Supabase unavailable, etc.
    console.warn("[MINGLEY] bootstrapAuth error:", err);
  }
}
