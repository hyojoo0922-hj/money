import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/**
 * supabase client — null when env vars are absent (local mock-only mode).
 * Always check for null before calling; the app must work without Supabase.
 */
export const supabase = url && key ? createClient(url, key) : null;

export const isSupabaseAvailable = (): boolean => supabase !== null;
