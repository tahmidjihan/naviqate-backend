import supabase from '../supabaseClient.js';

export default async function deleteData(id) {
  await id;
  const { error } = await supabase.from('data').delete().eq('id', id);
}
