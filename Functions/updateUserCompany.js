import supabase from '../supabaseClient.js';

export const updateUserCompany = async (id, company) => {
  const { data, error } = await supabase
    .from('users')
    .update({ company: company })
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
