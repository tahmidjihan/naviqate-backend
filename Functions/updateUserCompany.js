import supabase from '../supabaseClient.js';

export const updateUserCompany = async (
  id,
  company,
  company_id,
  company_email
) => {
  const { data, error } = await supabase
    .from('users')
    .update({
      company: company,
      company_id: company_id,
      company_email: company_email,
    })
    .eq('id', id);
  if (error) {
    return 'Supabase error:', error;
  } else {
    return 'Users:', data;
  }
};

// -- activate it when ready --
//
// export const updateUserRole = async (id, role) => {
//   const { data, error } = await supabase
//     .from('users')
//     .update({ role: role })
//     .eq('id', id);
//   if (error) {
//     return 'Supabase error:', error;
//   } else {
//     return 'Users:', data;
//   }
// };
