import supabase from '../../../Supabase.js';
import type { AnalyticsData } from './getAnalytics.js';

export async function updateAnalytics(
  fingerprint: string,
  data: AnalyticsData,
  owner: number
): Promise<void> {
  // First, upsert the analytics entry with just fingerprint and owner
  const { error: analyticsError } = await supabase
    .from('analytics')
    .upsert({ fingerprint, owner }, { onConflict: 'fingerprint' });

  if (analyticsError) {
    console.error('Error updating analytics:', analyticsError);
    throw new Error('Failed to update analytics');
  }

  // Map data keys to table names
  const tableMapping = {
    button: 'analytics_buttons',
    page: 'analytics_pages',
    form: 'analytics_forms',
  } as const;

  // Upsert events with fingerprint to their respective tables
  for (const [key, tableName] of Object.entries(tableMapping)) {
    const events = data[key as keyof AnalyticsData];

    if (events && events.length > 0) {
      // Add fingerprint to each event
      const eventsWithFingerprint = events.map((event) => ({
        ...event,
        fingerprint,
      }));

      const { error } = await supabase
        .from(tableName)
        .upsert(eventsWithFingerprint, { onConflict: 'id' });

      if (error) {
        console.error(`Error upserting ${tableName}:`, error);
      }
    }
  }
}
