import supabase from '../supabaseClient';

async function CreateUsers(name, email) {
  const { data, error } = await supabase
    .from('users')
    .insert([{ name: name, email: email }]);
  if (error) {
    console.error('Supabase error:', error);
  } else {
    console.log('Users:', data);
  }
}

export default CreateUsers;
