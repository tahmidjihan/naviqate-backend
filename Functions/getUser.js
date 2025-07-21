import supabase from '../supabaseClient.js';

export const getUser = async (id) => {
  const { data, error } = await supabase.from('users').select('*').eq('id', id);
  if (error) {
    return 'Supabase error:', error;
  } else {
    return 'Users:', data;
  }
};
