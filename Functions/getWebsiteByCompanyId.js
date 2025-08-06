import supabase from '../supabaseClient.js';

export const getWebsiteByCompanyId = async (company_id) => {
  const { data, error } = await supabase
    .from('company')
    .select('*')
    .eq('id', company_id);
  if (error) {
    return error;
  } else {
    return data;
  }
};
