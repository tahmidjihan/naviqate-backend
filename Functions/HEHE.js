import supabase from '../supabaseClient.js';

//db-id is 3

export const addDataHehe = async (data) => {
  // console.log(id);
  const { data: d, error } = await supabase.from('data').insert({
    db_id: 3,
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
