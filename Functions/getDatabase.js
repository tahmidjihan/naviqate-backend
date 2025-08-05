import supabase from '../supabaseClient.js';

export const getDatabases = async (id) => {
  await id;
  // console.log(id);
  const { data, error } = await supabase
    .from('databases')
    .select('*')
    .eq('company_id', id);
  if (error) {
    return error;
  } else {
    // await data;
    // console.log(data);
    return data;
  }
};
export const getDatabasesByCompanyId = async (company_id) => {
  const { data, error } = await supabase
    .from('databases')
    .select('*')
    .eq('company_id', company_id);
  if (error) {
    return error;
  } else {
    return data;
  }
};
