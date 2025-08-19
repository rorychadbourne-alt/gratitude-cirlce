import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    flowType: 'pkce', // Use PKCE flow instead of implicit
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

export interface Profile {
  id: string
  full_name: string
  avatar_url?: string
  created_at: string
}