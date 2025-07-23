import supabase from '../supabaseClient.js';
import { getCompanyByEmail } from './getCompany.js';
export const createCompany = async (name, email, created_by) => {
  const { data, error } = await supabase.from('company').insert([
    {
      name: name,
      email: email,
      created_by: created_by,
      created_at: new Date().toISOString(),
    },
  ]);
  if (error) {
    return 'Supabase error:', error;
  } else {
    const company = await getCompanyByEmail(email);
    return 'Company:', company;
  }
};
