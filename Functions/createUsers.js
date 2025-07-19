import supabase from '../supabaseClient';

async function CreateUsers(name, email) {
  const { data, error } = await supabase
    .from('users')
    .insert([{ name: name, email: email, created_at }]);
  if (error) {
    return 'Supabase error:', error;
  } else {
    return 'Users:', data;
  }
}

export default CreateUsers;
