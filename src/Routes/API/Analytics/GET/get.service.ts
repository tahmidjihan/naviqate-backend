import supabase from '../../../../Supabase.js';
import type { formData, buttonData, pageData } from '../Types/types.js';

// type result = Array<resultType>

async function getAnalyticsByFingerprint(fingerprint: string) {
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

async function getAnalytics(owner: string, event: string) {
  // 1. Get fingerprints for this owner if they are not directly in the event table
  // Assuming the owner is stored in the 'analytics' table which links to fingerprints
  const { data: userAnalytics, error: userError } = await supabase
    .from('analytics')
    .select('fingerprint')
    .eq('owner', owner);

  if (userError) {
    console.error('Error fetching fingerprints for owner:', userError);
    throw new Error('Failed to fetch analytics');
  }

  if (!userAnalytics || userAnalytics.length === 0) {
    return [];
  }

  const fingerprints = userAnalytics.map((ua) => ua.fingerprint);

  // 2. Fetch specific event data for all matching fingerprints
  const tableName = `analytics_${event}s`;
  const { data: eventData, error: eventError } = await supabase
    .from(tableName)
    .select('*')
    .in('fingerprint', fingerprints);

  if (eventError) {
    console.error(`Error fetching from ${tableName}:`, eventError);
    // If table doesn't exist or other error, return empty instead of crashing
    return [];
  }

  return eventData || [];
}
async function getUniquePageViews(owner: string) {
  const { data, error } = await supabase
    .from('analytics')
    .select('*')
    .eq('owner', owner);

  if (error) {
    console.error('Error fetching unique page views:', error);
    throw new Error('Failed to fetch unique page views');
  }

  return data ? data.length : 0;
}
export default { getAnalyticsByFingerprint, getAnalytics };
