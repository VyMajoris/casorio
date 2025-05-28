import { getSupabase, isSupabaseConfigured } from './supabase'

// Define the Gift interface to match the expected structure
export interface Gift {
  sort_order: number
  name: string
  value: number
  icon: string
  image_url: string
  pct_acquired: number
}

// Function to fetch all gifts from Supabase
export async function getGifts(): Promise<Gift[]> {
  try {
    console.log("Fetching gifts from Supabase...")
    // Check if Supabase is configured
    if (!isSupabaseConfigured()) {
      console.log('Supabase not configured, skipping database fetch')
      return []
    }

    const supabase = getSupabase()
    if (!supabase) {
      console.log('Supabase client not available')
      return []
    }

    const { data, error } = await supabase
      .from('gifts') // Assuming the table name is 'gifts'
      .select('*')
      .order('value', { ascending: false })

    if (error) {
      console.error('Error fetching gifts:', error)
      throw new Error(`Failed to fetch gifts: ${error.message}`)
    }

    return (data as unknown as Gift[]) || []
  } catch (error) {
    console.error('Unexpected error fetching gifts:', error)
    // Return empty array as fallback
    return []
  }
}

// Function to get a specific gift by ID
export async function getGiftById(id: number): Promise<Gift | null> {
  try {
    // Check if Supabase is configured
    if (!isSupabaseConfigured()) {
      console.log('Supabase not configured, skipping database fetch')
      return null
    }

    const supabase = getSupabase()
    if (!supabase) {
      console.log('Supabase client not available')
      return null
    }

    const { data, error } = await supabase
      .from('gifts')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching gift:', error)
      return null
    }

    return data as unknown as Gift
  } catch (error) {
    console.error('Unexpected error fetching gift:', error)
    return null
  }
}

// Fallback function to get gifts from local JSON (for development/testing)
export async function getFallbackGifts(): Promise<Gift[]> {
  try {
    // Dynamic import to avoid bundling issues
    const giftsString = localStorage.getItem("gifts")
    if (!giftsString) return []
    const giftsData = JSON.parse(giftsString)

    return giftsData.map((gift: any) => ({
      sort_order: gift.sort_order,
      name: gift.name,
      value: gift.value,
      icon: gift.icon,
      image_url: gift.image_url,
      pct_acquired: gift.pct_acquired ?? 0
    }))
  } catch (error) {
    console.error('Error loading fallback gifts:', error)
    return []
  }
}
