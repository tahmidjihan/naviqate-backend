// import type { blogType } from '@/backendProvider';
import supabase from '../../../Supabase.js';

export type blogType = {
  id?: number;
  title: string;
  image: string;
  data: string;
  created_by?: string;
  owner: number;
};
export async function getBlogs(companyId: number) {
  // console.log(companyId);
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('owner', companyId);
  if (error) {
    console.log(error);
  }
  return data;
}

export async function getBlogById(companyId: number, id: number) {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('owner', companyId)
    .eq('id', id)
    .single();
  if (error) {
    console.log(error);
  }
  return data;
}
export async function insertBlog(blog: blogType) {
  const { data, error } = await supabase.from('blogs').insert(blog);
  if (error) {
    console.log(error);
  }
  return data;
}
export async function updateBlog(id: number, blog: blogType) {
  const { data, error } = await supabase
    .from('blogs')
    .update(blog)
    .eq('id', id);
  if (error) {
    console.log(error);
  }
  return data;
}
export async function deleteBlog(id: number) {
  const { data, error } = await supabase.from('blogs').delete().eq('id', id);
  if (error) {
    console.log(error);
  }
  return data;
}
