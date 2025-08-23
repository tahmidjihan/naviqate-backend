import supabase from '../supabaseClient.js';
import { getCompanyByEmail } from './getCompany.js';
export const createCompany = async (name, email, created_by) => {
  const generateSecret = () => {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let secret = '';
    for (let i = 0; i < 64; i++) {
      secret += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return secret;
  };
  const { data, error } = await supabase.from('company').insert([
    {
      name: name,
      email: email,
      created_by: created_by,
      created_at: new Date().toISOString(),
      company_secret: generateSecret(),
    },
  ]);
  if (error) {
    return error;
  } else {
    const company = await getCompanyByEmail(email);
    return 'Company:', company;
  }
};
