import supabase from '../supabaseClient.js';

export const createDatabases = async (name, created_by, company) => {
  const { data, error } = await supabase.from('databases').insert([]);
  if (error) {
    return 'Supabase error:', error;
  } else {
    return 'Users:', data;
  }
};
