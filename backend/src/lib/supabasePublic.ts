import { createClient } from "@supabase/supabase-js";

export function getSupabaseClient(accessToken: string) {
  if (!accessToken) {
    throw new Error("Missing access token");
  }

  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    },
  );
}
