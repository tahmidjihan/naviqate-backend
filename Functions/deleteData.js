import supabase from '../supabaseClient.js';

export default function deleteData(id) {
  const { data, error } = supabase.from('data').delete().eq('id', id);
  if (error) {
    return 'Supabase error:', error;
  } else {
    return 'Data:', data;
  }
}
