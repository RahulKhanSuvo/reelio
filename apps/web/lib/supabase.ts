import { createClient } from "@supabase/supabase-js";

/**
 * Admin panel client. Uses the publishable key + RLS policies;
 * admin capabilities come from profiles.is_admin on the server side.
 */
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_KEY!,
);
