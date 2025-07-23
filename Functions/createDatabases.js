import supabase from '../supabaseClient.js';

export const createDatabases = async (
  name,
  created_by,
  company,
  company_id
) => {
  const { data, error } = await supabase.from('databases').insert([
    {
      name: name,
      created_by: created_by,
      company: company,
      company_id: company_id,
      updated_at: new Date().toISOString(),
    },
  ]);
  if (error) {
    return 'Supabase error:', error;
  } else {
    return 'Users:', data;
  }
};
