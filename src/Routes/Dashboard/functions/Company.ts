// import type { CompanyType } from '@/backendProvider';
import supabase from '../../../Supabase.js';
export type ActivityDataType = {
  day: string;
  visits: number;
};

export type InfoItemType = {
  icon: string;
  title: string;
  data: string[] | number;
  description: string;
};

export type SharingMemberType = {
  name: string;
  email: string;
  status: string;
};

export type CompanyType = {
  id?: string;
  name: string;
  owner: string;
  domain: string;
  activity_data?: ActivityDataType[];
  info?: InfoItemType[];
  sharing?: SharingMemberType[];
};
export async function getCompanyById(id: string) {
  // TODO: Implement Supabase query to fetch company by id
  const { data, error } = await supabase
    .from('company_data')
    .select('*')
    .eq('id', id)
    .single();
  if (error) {
    console.log(error);
  }
  return data;
}

export async function createCompany(company: CompanyType) {
  function generateKey() {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let key = '';
    for (let i = 0; i < 32; i++) {
      key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return key;
  }
  async function checkKeyUnique(key: string) {
    const data = await supabase
      .from('company_data')
      .select('*')
      .eq('key', key)
      .single();
    // @ts-ignore
    if (typeof data === 'object' && data && data.key) {
      return false;
    }
    return true;
  }
  let uniqueKey = generateKey();
  while (!(await checkKeyUnique(uniqueKey))) {
    uniqueKey = generateKey();
  }
  // @ts-ignore
  company.key = uniqueKey;

  const { data, error } = await supabase
    .from('company_data')
    .insert(company)
    .select()
    .single();
  if (error) {
    console.log(error);
    return null;
  }

  // Update user metadata with company_id
  const { error: updateError } = await supabase.auth.updateUser({
    data: { company_id: data.id },
  });
  if (updateError) {
    console.log(updateError);
  }

  return data;

  console.log('createCompany called with:', company);
  return null;
}

export async function updateCompany(id: string, company: CompanyType) {
  const { data, error } = await supabase
    .from('company_data')
    .update(company)
    .eq('id', id)
    .select()
    .single();
  if (error) {
    console.log(error);
  }
  return data;

  // console.log('updateCompany called with id:', id, 'and data:', company);
  // return null;
}
