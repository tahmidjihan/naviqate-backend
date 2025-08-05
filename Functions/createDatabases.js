import supabase from '../supabaseClient.js';

export const createDatabases = async (name, company_id) => {
  console.log({ name, company_id });
  const { data, error } = await supabase.from('databases').insert([
    {
      name: name,
      company_id: company_id,
      updated_at: new Date().toISOString(),
    },
  ]);
  if (error) {
    return error;
  } else {
    return 'Users:', data;
  }
};
