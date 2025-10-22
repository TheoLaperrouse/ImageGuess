import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const bucketName = import.meta.env.VITE_SUPABASE_BUCKET_NAME;

export const supabase = createClient(supabaseUrl, supabaseKey);

export const publicUrl = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/${bucketName}/`;
