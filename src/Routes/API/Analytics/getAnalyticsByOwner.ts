import supabase from '../../../Supabase.js';
import type { AnalyticsData } from './getAnalytics.js';

export async function getAnalyticsByOwner(
  owner: string
): Promise<Array<{ fingerprint: string; data: AnalyticsData }>> {
  const { data, error } = await supabase
    .from('analytics')
    .select('fingerprint, buttons, pages, forms')
    .eq('owner', owner);

  if (error) {
    console.error('Error fetching analytics by owner:', error);
    throw new Error('Failed to fetch analytics');
  }

  // Reconstruct data objects for each entry
  return (data || []).map((entry) => ({
    fingerprint: entry.fingerprint,
    data: {
      button: entry.buttons || [],
      page: entry.pages || [],
      form: entry.forms || [],
    },
  }));
}
