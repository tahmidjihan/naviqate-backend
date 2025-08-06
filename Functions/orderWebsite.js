import supabase from 'supabase.js';

// data looks like
// {
// company_id: 52,
// description: "adf asd af asdf asdfa sdaf asdfasdf ",
// features: "adf adsf sdf sad sdfa asdf asdf asf as ",
// files: 'location of files',
// pages: "3",
// primaryColor: "#8b5cf6",
// references: "",
// secondaryColor: "#1d4ed8",
// termsAccepted: true,
// websiteType: "ecommerce",
//}c
export default async function orderWebsite(details) {
  const { data, error } = await supabase.from('order').insert([details]);
  if (error) {
    return error;
  } else {
    return data;
  }
}
