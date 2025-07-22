import supabase from '../supabaseClient.js';

export const getCompanyByEmail = async (email) => {
  const { data, error } = await supabase
    .from('company')
    .select('*')
    .eq('email', email);
  if (error) {
    return 'Supabase error:', error;
  } else {
    return 'Companies:', data;
  }
};
