import { createClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/private';
import type { Link } from './schema';

if (!env.SUPABASE_URL) throw new Error('SUPABASE_URL is not set');
if (!env.SUPABASE_SERVICE_ROLE_KEY) throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set');

export const supabaseAdmin = createClient(
  env.SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY
);

// 링크 관련 함수들
export async function getLinks(userId: string) {
  const { data, error } = await supabaseAdmin
    .from('links')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data as Link[];
}

export async function createLink(link: Omit<Link, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabaseAdmin
    .from('links')
    .insert(link)
    .select()
    .single();
  
  if (error) throw error;
  return data as Link;
}

export async function updateLink(id: string, link: Partial<Link>) {
  const { data, error } = await supabaseAdmin
    .from('links')
    .update(link)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data as Link;
}

export async function deleteLink(id: string) {
  const { error } = await supabaseAdmin
    .from('links')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
}
