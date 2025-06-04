import { supabase } from '$lib/supabase';
import { user } from '$lib/stores/auth';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  user.set(session?.user ?? null);

  supabase.auth.onAuthStateChange((_event, session) => {
    user.set(session?.user ?? null);
  });
}; 