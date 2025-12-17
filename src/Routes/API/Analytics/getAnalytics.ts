import supabase from '../../../Supabase.js';

export interface AnalyticsData {
  form?: Array<{ id?: number; form: string; percentage: string }>;
  page?: Array<{ id?: number; page: string; percentage: number }>;
  button?: Array<{ id?: number; page: string; button: string }>;
}

export async function getAnalytics(
  fingerprint: string
): Promise<AnalyticsData | null> {
  // Check if analytics entry exists
  const { data: analyticsEntry, error: analyticsError } = await supabase
    .from('analytics')
    .select('fingerprint')
    .eq('fingerprint', fingerprint)
    .single();

  if (analyticsError || !analyticsEntry) {
    console.log('No existing analytics found for fingerprint:', fingerprint);
    return null;
  }

  // Fetch data from each event table
  const { data: buttons } = await supabase
    .from('analytics_buttons')
    .select('*')
    .eq('fingerprint', fingerprint);

  const { data: pages } = await supabase
    .from('analytics_pages')
    .select('*')
    .eq('fingerprint', fingerprint);

  const { data: forms } = await supabase
    .from('analytics_forms')
    .select('*')
    .eq('fingerprint', fingerprint);

  // Reconstruct the data object
  return {
    button: buttons || [],
    page: pages || [],
    form: forms || [],
  };
}
