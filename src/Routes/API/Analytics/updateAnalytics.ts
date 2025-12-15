import supabase from '../../../Supabase.js';
import type { AnalyticsData } from './getAnalytics.js';

export async function updateAnalytics(
  fingerprint: string,
  data: AnalyticsData,
  owner: string
): Promise<void> {
  const { error } = await supabase
    .from('analytics')
    .upsert({ fingerprint, data, owner }, { onConflict: 'fingerprint' });

  if (error) {
    console.error('Error updating analytics:', error);
    throw new Error('Failed to update analytics');
  }
}
