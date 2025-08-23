import supabase from '../supabaseClient.js';

function getCompanyByEmail(email) {
  return supabase.from('company').select('*').eq('email', email);
}
return getCompanyByEmail;
