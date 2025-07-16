import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL, // e.g. https://urmtsdminiolmxajhbrt.supabase.co
  process.env.SUPABASE_SERVICE_KEY // service_role secret (from Supabase settings)
);

export default supabase;
