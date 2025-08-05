import supabase from '../supabaseClient.js';

export const CreateUsers = async (name, email) => {
  const { data, error } = await supabase
    .from('users')
    .insert([
      { name: name, email: email, created_at: new Date().toISOString() },
    ]);
  if (error) {
    return error;
  } else {
    return 'Users:', data;
  }
};
