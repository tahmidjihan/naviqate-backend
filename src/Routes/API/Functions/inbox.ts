import supabase from '../../../Supabase.js';

export const postInbox = async (inbox_id: string, data: string) => {
  const dataWillBeInserted = { inbox_id: inbox_id, data: data };
  const { data: insertedData, error } = await supabase
    .from('inbox_data')
    .insert(dataWillBeInserted);

  if (error) {
    console.error('Error inserting data:', error);
  }

  return insertedData;
};
