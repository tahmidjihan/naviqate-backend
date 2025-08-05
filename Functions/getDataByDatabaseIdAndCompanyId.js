import supabase from '../supabaseClient.js';

function getDataByDatabaseIdAndCompanyId(db_id, company_id) {
  const { data, error } = supabase
    .from('data')
    .select('*')
    .eq('db_id', db_id)
    .eq('company_id', company_id);

  if (error) {
    return error;
  } else {
    return data;
  }
}
