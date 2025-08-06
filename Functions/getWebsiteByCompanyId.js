import supabase from '../supabaseClient.js';

export const getWebsiteByCompanyId = async (company_id) => {
  const { data, error } = await supabase
    .from('websites')
    .select('*')
    .eq('company_id', company_id);
  if (error) {
    return error;
  } else {
    return data;
  }
};
