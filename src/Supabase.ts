import { createClient } from '@supabase/supabase-js';
// import 'dotenv/config';
import envData from './dataOfEnv.ts';

// console.log(envData);
const { DB_URL = '', DB_ANON = '' } = envData;

const supabase = createClient(DB_URL, DB_ANON);
export default supabase;
