import supabase from '../supabaseClient.js';

export const getWebsiteByCompanyId = async (company_id) => {
  const { data, error } = await supabase
    .from('databases')
    .select('*')
    .eq('company_id', company_id);
  if (error) {
    return 'Supabase error:', error;
  } else {
    return 'Databases:', data;
  }
};
