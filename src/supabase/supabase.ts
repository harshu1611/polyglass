import { createClient } from "@supabase/supabase-js";

const supabaseUrl: string=import.meta.env.VITE_APP_SUPABASE_URL
const supabaseAnon: string= import.meta.env.VITE_APP_SUPABASE_ANON_KEY
export const supabase = createClient(supabaseUrl,supabaseAnon);

// export default supabase;