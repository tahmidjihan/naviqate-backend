// import type { inboxType } from "@/backendProvider";
import supabase from '../../../Supabase.js';

export type inboxType = {
  id?: number;
  created_by?: string;
  name: string;
  owner: number;
};
export async function getInboxes(companyId: number) {
  const { data, error } = await supabase
    .from('inboxes')
    .select('*')
    .eq('owner', companyId);
  if (error) throw error;
  return data;
}
export async function createInbox(inbox: inboxType) {
  const { data, error } = await supabase.from('inboxes').insert(inbox);
  if (error) throw error;
  return data;
}
// inbox_data
export async function getInboxData(id: number) {
  const { data, error } = await supabase
    .from('inbox_data')
    .select('*')
    .eq('inbox_id', id);
  if (error) throw error;
  return data;
}

export async function deleteInboxData(id: number) {
  const { error } = await supabase.from('inbox_data').delete().eq('id', id);
  if (error) throw error;
  return true;
}

export async function deleteInbox(id: number) {
  const { error } = await supabase.from('inboxes').delete().eq('id', id);
  if (error) throw error;
  return true;
}
