import supabase from '../supabaseClient.js';

export const getCompany = async (email) => {
  const { data, error } = await supabase
    .from('company')
    .select('*')
    .eq('email', email);
  if (error) {
    return error;
  } else {
    return 'Companies:', data;
  }
};
