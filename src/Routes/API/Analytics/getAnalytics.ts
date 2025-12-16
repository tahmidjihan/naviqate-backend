import supabase from '../../../Supabase.js';

export interface AnalyticsData {
  form?: Array<{ form: string; percent: string }>;
  page?: Array<{ page: string; percentage: number }>;
  button?: Array<{ page: string; button: string }>;
}

export async function getAnalytics(
  fingerprint: string
): Promise<AnalyticsData | null> {
  const { data, error } = await supabase
    .from('analytics')
    .select('buttons, pages, forms')
    .eq('fingerprint', fingerprint)
    .single();

  if (error) {
    console.log('No existing analytics found for fingerprint:', fingerprint);
    return null;
  }

  // Reconstruct the data object
  return {
    button: data?.buttons || [],
    page: data?.pages || [],
    form: data?.forms || [],
  };
}
