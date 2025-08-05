import supabase from '../supabaseClient.js';

export const getUser = async (id) => {
  const { data, error } = await supabase.from('users').select('*').eq('id', id);
  if (error) {
    return error;
  } else {
    return 'Users:', data;
  }
};
export const getUserByEmail = async (email) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email);
  if (error) {
    return error;
  } else {
    return 'Users:', data;
  }
};
