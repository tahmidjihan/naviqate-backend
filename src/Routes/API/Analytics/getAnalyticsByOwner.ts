import supabase from '../../../Supabase.js';
import type { AnalyticsData } from './getAnalytics.js';

export async function getAnalyticsByOwner(
  owner: string
): Promise<Array<{ fingerprint: string; data: AnalyticsData }>> {
  const { data, error } = await supabase
    .from('analytics')
    .select('fingerprint, data')
    .eq('owner', owner);

  if (error) {
    console.error('Error fetching analytics by owner:', error);
    throw new Error('Failed to fetch analytics');
  }

  return data || [];
}
