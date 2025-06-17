import { getSupabase, isSupabaseConfigured } from './supabase'

export interface Donation {
  id: number
  uid?: string
  created_at: string
  value: number
  payer: string
  method: string
  date?: string
}

export interface NewDonation {
  value: number
  payer: string
  method: string
}

// Function to fetch all donations from Supabase
export async function getDonations(): Promise<Donation[]> {
  try {
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
      .from('doacoes')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching donations:', error)
      throw new Error(`Failed to fetch donations: ${error.message}`)
    }

    return (data as unknown as Donation[]) || []
  } catch (error) {
    console.error('Unexpected error fetching donations:', error)
    return []
  }
}

// Function to add a new donation
export async function addDonation(donation: NewDonation): Promise<Donation | null> {
  try {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured')
    }

    const supabase = getSupabase()
    if (!supabase) {
      throw new Error('Supabase client not available')
    }

    const { data, error } = await supabase
      .from('doacoes')
      .insert([
        {
          value: donation.value,
          payer: donation.payer,
          method: donation.method
        }
      ])
      .select()
      .single()

    if (error) {
      console.error('Error adding donation:', error)
      throw new Error(`Failed to add donation: ${error.message}`)
    }

    return data as unknown as Donation
  } catch (error) {
    console.error('Unexpected error adding donation:', error)
    throw error
  }
}

// Function to get total donated amount
export async function getTotalDonated(): Promise<number> {
  try {
    const donations = await getDonations()
    return donations.reduce((sum, donation) => sum + donation.value, 0)
  } catch (error) {
    console.error('Error calculating total donated:', error)
    return 0
  }
}