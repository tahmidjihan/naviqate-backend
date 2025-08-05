import supabase from '../supabaseClient.js';

export const getDataByDatabaseId = async (db_id) => {
  const { data, error } = await supabase
    .from('data')
    .select('*')
    .eq('db_id', db_id);
  if (error) {
    return error;
  } else {
    return data;
  }
};
