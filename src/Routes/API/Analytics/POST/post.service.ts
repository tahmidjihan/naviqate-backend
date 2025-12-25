import supabase from '../../../../Supabase.js';
import type { formData, buttonData, pageData } from '../Types/types.js';

interface AnalyticsData {
  button?: buttonData[];
  page?: pageData[];
  form?: formData[];
}

export async function updateAnalytics(
  fingerprint: string,
  data: AnalyticsData,
  owner: number
): Promise<void> {
  const { error: analyticsError } = await supabase
    .from('analytics')
    .upsert({ fingerprint, owner }, { onConflict: 'fingerprint' });

  if (analyticsError) {
    console.error('Error updating analytics:', analyticsError);
    throw new Error('Failed to update analytics');
  }

  const tableMapping = {
    button: 'analytics_buttons',
    page: 'analytics_pages',
    form: 'analytics_forms',
  } as const;

  // ? This is a removal of os/browser-specific routes from data
  // TODO this should be handled on the client side to avoid sending unnecessary data
  // TODO this will be added in the library update
  if (data.page) {
    const unnecessary = [
      '/.well-known/*',
      '/apple-app-site-association',
      '/.well-known/assetlinks.json',
      '/.well-known/apple-app-site-association',
      '/manifest.json',
      '/browserconfig.xml',
      '/favicon.ico',
    ];
    data.page = data.page.filter((page) => !unnecessary.includes(page.page));
  }
  // ? end

  for (const [key, tableName] of Object.entries(tableMapping)) {
    const events = data[key as keyof AnalyticsData];
    if (events && events.length > 0) {
      const eventsWithFingerprint = events.map((event) => ({
        ...event,
        fingerprint,
      }));

      // Note: We might need a unique ID or onConflict strategy for actual events
      // For now, using the logic provided but cautious about 'id' conflict if not present
      const { error } = await supabase
        .from(tableName)
        .upsert(eventsWithFingerprint);

      if (error) console.error(`Error upserting ${tableName}:`, error);
    }
  }
}
