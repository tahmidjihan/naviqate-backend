import supabase from '../supabaseClient.js';

const getUsers = async (req, res) => {
  const { data, error } = await supabase.from('users').select('*');

  if (error) {
    return 'Supabase error:', error;
  } else {
    return 'Users:', data;
  }
};

export default getUsers;
