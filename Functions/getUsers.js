import supabase from '../supabaseClient.js';

const getUsers = async () => {
  const { data, error } = await supabase.from('users').select('*');

  if (error) {
    console.error('❌ Supabase error:', error);
  } else {
    console.log('✅ Users:', data);
  }
};

export default getUsers;
