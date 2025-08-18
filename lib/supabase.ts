import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

export type Profile = {
  id: string
  email: string
  full_name: string
  avatar_url: string
  created_at: string
}

export type Circle = {
  id: string
  name: string
  description: string
  invite_code: string
  created_by: string
  created_at: string
}

export type GratitudeResponse = {
  id: string
  user_id: string
  circle_id: string
  prompt_id: string
  response_text: string
  created_at: string
  profiles: Profile
  response_likes: { user_id: string }[]
}

export type DailyPrompt = {
  id: string
  prompt_text: string
  date: string
}