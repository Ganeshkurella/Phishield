import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://jsprinvvcvmqdrthnrch.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpzcHJpbnZ2Y3ZtcWRydGhucmNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5Mjg0MTEsImV4cCI6MjA4OTUwNDQxMX0.c8PrgLs5ICo-JqCXYKXRurcpHHXUiqOgbCWH1XTdS7E";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
