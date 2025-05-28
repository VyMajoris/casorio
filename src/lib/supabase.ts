import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Function to check if Supabase is properly configured
export function isSupabaseConfigured(): boolean {
  return !!(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl !== 'your_supabase_project_url_here' &&
    supabaseAnonKey !== 'your_supabase_anon_key_here' &&
    supabaseUrl.startsWith('https://')
  )
}

// Create Supabase client only if properly configured
export function getSupabaseClient() {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase is not properly configured')
  }
  return createClient(supabaseUrl!, supabaseAnonKey!)
}

// Export a lazy-initialized supabase instance
let _supabaseClient: ReturnType<typeof createClient> | null = null

export function getSupabase() {
  if (!_supabaseClient && isSupabaseConfigured()) {
    _supabaseClient = getSupabaseClient()
  }
  return _supabaseClient
}
