import supabase from '../supabaseClient.js';

export const getDatabase = async (id) => {
  const { data, error } = await supabase
    .from('databases')
    .select('*')
    .eq('id', id);
  if (error) {
    return 'Supabase error:', error;
  } else {
    return 'Databases:', data;
  }
};
