import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://your-project.supabase.co'
const supabaseKey = 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Function to increment visit count
export const incrementVisitCount = async (): Promise<number> => {
  try {
    // First, try to get the current count
    const { data: existingData, error: fetchError } = await supabase
      .from('visit_stats')
      .select('count')
      .eq('id', 'global')
      .single()

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Error fetching visit count:', fetchError)
      return 1
    }

    const currentCount = existingData?.count || 0
    const newCount = currentCount + 1

    // Update or insert the count
    const { error: upsertError } = await supabase
      .from('visit_stats')
      .upsert({ 
        id: 'global', 
        count: newCount,
        updated_at: new Date().toISOString()
      })

    if (upsertError) {
      console.error('Error updating visit count:', upsertError)
      return currentCount
    }

    return newCount
  } catch (error) {
    console.error('Error in incrementVisitCount:', error)
    return 1
  }
}

// Function to get current visit count
export const getVisitCount = async (): Promise<number> => {
  try {
    const { data, error } = await supabase
      .from('visit_stats')
      .select('count')
      .eq('id', 'global')
      .single()

    if (error) {
      console.error('Error fetching visit count:', error)
      return 0
    }

    return data?.count || 0
  } catch (error) {
    console.error('Error in getVisitCount:', error)
    return 0
  }
}