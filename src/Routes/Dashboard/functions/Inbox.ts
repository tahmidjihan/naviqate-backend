// import type { inboxType } from "@/backendProvider";
import supabase from '../../../Supabase.js';

export type inboxType = {
  id?: number;
  created_by: string;
  name: string;
};
export async function getInboxes(email: string) {
  const { data, error } = await supabase
    .from('inboxes')
    .select('*')
    .eq('created_by', email);
  if (error) throw error;
  return data;
}
export async function createInbox(inbox: inboxType) {
  const { data, error } = await supabase.from('inboxes').insert(inbox);
  if (error) throw error;
  return data;
}
// inbox_data
export async function getInboxData(id: string) {
  const { data, error } = await supabase
    .from('inbox_data')
    .select('*')
    .eq('inbox_id', id);
  if (error) throw error;
  return data;
}

export async function deleteInboxData(id: string) {
  const { error } = await supabase.from('inbox_data').delete().eq('id', id);
  if (error) throw error;
  return true;
}

export async function deleteInbox(id: string) {
  const { error } = await supabase.from('inboxes').delete().eq('id', id);
  if (error) throw error;
  return true;
}

// Get latest messages from all inboxes for dashboard
// export async function getLatestMessages(email: string, limit: number = 4) {
//   // TODO: Implement query to get latest messages across all user's inboxes
//   // This should:
//   // 1. Get all inboxes for the user
//   // 2. Get the latest message from each inbox
//   // 3. Sort by date and return the most recent ones

//   const { data: inboxes, error: inboxError } = await supabase
//     .from('inboxes')
//     .select('id, name')
//     .eq('created_by', email);
//   if (inboxError) throw inboxError;

//   if (!inboxes || inboxes.length === 0) {
//     return [];
//   }

//   const { data: messages, error: msgError } = await supabase
//     .from('Inbox_data')
//     .select('*, inboxes(name)')
//     .in(
//       'inbox_id',
//       inboxes.map((i) => i.id)
//     )
//     .order('created_at', { ascending: false })
//     .limit(limit);

//   if (msgError) throw msgError;

//   return messages;

//   console.log('getLatestMessages called for:', email, 'limit:', limit);
//   return [];
// }
