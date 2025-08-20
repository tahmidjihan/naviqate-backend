import supabase from '../supabaseClient.js';

//db-id is 4

export const addDataHehe = async (data) => {
  // console.log(id);
  const { data, error } = await supabase.from('data').insert({
    db_id: 4,
    created_at: new Date().toISOString(),
    undone: true,
    data: data,
  });
  if (error) {
    return error;
  } else {
    return data;
  }
};
