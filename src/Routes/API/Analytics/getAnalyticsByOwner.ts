import supabase from '../../../Supabase.js';
import type { AnalyticsData } from './getAnalytics.js';

export async function getAnalyticsByOwner(
  owner: string
): Promise<Array<{ fingerprint: string; data: AnalyticsData }>> {
  // Get all analytics entries for this owner
  const { data: analyticsEntries, error } = await supabase
    .from('analytics')
    .select('fingerprint')
    .eq('owner', owner);

  if (error) {
    console.error('Error fetching analytics by owner:', error);
    throw new Error('Failed to fetch analytics');
  }

  if (!analyticsEntries || analyticsEntries.length === 0) {
    return [];
  }

  // For each fingerprint, fetch the event data
  const results = await Promise.all(
    analyticsEntries.map(async (entry) => {
      const { data: buttons } = await supabase
        .from('analytics_buttons')
        .select('*')
        .eq('fingerprint', entry.fingerprint);

      const { data: pages } = await supabase
        .from('analytics_pages')
        .select('*')
        .eq('fingerprint', entry.fingerprint);

      const { data: forms } = await supabase
        .from('analytics_forms')
        .select('*')
        .eq('fingerprint', entry.fingerprint);

      return {
        fingerprint: entry.fingerprint,
        data: {
          button: buttons || [],
          page: pages || [],
          form: forms || [],
        },
      };
    })
  );

  return results;
}
