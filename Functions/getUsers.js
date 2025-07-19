import supabase from '../supabaseClient.js';

export const getUsers = async (req, res) => {
  const { data, error } = await supabase.from('users').select('*');

  console.log(data);

  if (error) {
    return 'Supabase error:', error;
  } else {
    // console.log(data);
    return 'Users:', data;
  }
};
