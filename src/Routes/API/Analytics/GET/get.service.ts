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

interface AnalyticsRow {
  time: string;
  fingerprint: string;
  page: string;
  button?: string;
  form?: string;
  percentage: number;
}

async function getAnalytics(owner: string, event: string) {
  // 1. Get fingerprints for this owner
  const { data: userAnalytics, error: userError } = await supabase
    .from('analytics')
    .select('fingerprint')
    .eq('owner', owner);

  if (userError) {
    console.error('Error fetching fingerprints for owner:', userError);
    throw new Error('Failed to fetch analytics');
  }

  if (!userAnalytics || userAnalytics.length === 0) {
    return { uniqueSets: event === 'button' ? [] : null, data: {} };
  }

  const fingerprints = userAnalytics.map((ua) => ua.fingerprint);

  // 2. Fetch specific event data (last 90 days only)
  const tableName = `analytics_${event}s`;
  const ninetyDaysAgo = new Date();
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

  const { data: eventData, error: eventError } = await supabase
    .from(tableName)
    .select('*')
    .in('fingerprint', fingerprints)
    .gte('time', ninetyDaysAgo.toISOString())
    .order('time', { ascending: true });

  if (eventError) {
    console.error(`Error fetching from ${tableName}:`, eventError);
    return { uniqueSets: event === 'button' ? [] : null, data: {} };
  }

  const rows = (eventData || []) as AnalyticsRow[];

  // 3. Transformation Logic
  const data: Record<string, any[]> = {};
  let uniqueSets: string[] | null = null;

  if (event === 'button') {
    uniqueSets = Array.from(
      new Set(rows.map((d) => `${d.button} at ${d.page}`))
    );
    rows.forEach((d) => {
      const key = `${d.button} at ${d.page}`;
      if (!data[key]) data[key] = [];
      const date = d.time.split(' ')[0];
      let dateEntry = data[key].find((e: any) => e.date === date);
      if (!dateEntry) {
        dateEntry = { date, primary: 0 };
        data[key].push(dateEntry);
      }
      dateEntry.primary++;
    });
    // Sort each array by date
    Object.values(data).forEach((arr: any[]) => {
      arr.sort((a, b) => a.date.localeCompare(b.date));
    });
  } else if (event === 'form') {
    rows.forEach((d) => {
      const key = d.form || 'unknown';
      if (!data[key]) data[key] = [];
      const date = d.time.split(' ')[0];
      let dateEntry = data[key].find((e: any) => e.date === date);
      if (!dateEntry) {
        dateEntry = {
          date,
          primary: 0,
          secondary: 0,
          _sum: 0,
          _count: 0,
        };
        data[key].push(dateEntry);
      }
      dateEntry._sum += d.percentage;
      dateEntry._count++;
      dateEntry.primary = dateEntry._sum / dateEntry._count;
      if (d.percentage === 100) dateEntry.secondary++;
    });
    // Clean up internal fields and sort
    Object.values(data).forEach((arr: any[]) => {
      arr.forEach((e: any) => {
        delete e._sum;
        delete e._count;
      });
      arr.sort((a, b) => a.date.localeCompare(b.date));
    });
  } else if (event === 'page') {
    rows.forEach((d) => {
      const key = d.page;
      if (!data[key]) data[key] = [];
      const date = d.time.split(' ')[0];
      let dateEntry = data[key].find((e: any) => e.date === date);
      if (!dateEntry) {
        dateEntry = {
          date,
          primary: 0,
          secondary: 0,
          _sum: 0,
        };
        data[key].push(dateEntry);
      }
      dateEntry.primary++; // total count
      dateEntry._sum += d.percentage;
      dateEntry.secondary = dateEntry._sum / dateEntry.primary; // average percentage
    });
    // Clean up internal fields and sort
    Object.values(data).forEach((arr: any[]) => {
      arr.forEach((e: any) => {
        delete e._sum;
      });
      arr.sort((a, b) => a.date.localeCompare(b.date));
    });
  }

  return { uniqueSets, data };
}
async function getUniquePageViews(owner: string) {
  const ninetyDaysAgo = new Date();
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

  const { data, error } = await supabase
    .from('analytics')
    .select('*')
    .eq('owner', owner)
    .gte('time', ninetyDaysAgo.toISOString());

  if (error) {
    console.error('Error fetching unique page views:', error);
    throw new Error('Failed to fetch unique page views');
  }

  return data ? data.length : 0;
}
export default { getAnalyticsByFingerprint, getAnalytics };
