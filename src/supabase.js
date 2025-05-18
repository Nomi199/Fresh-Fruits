import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://toccjatiogjybyxmxcbd.supabase.co";
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRvY2NqYXRpb2dqeWJ5eG14Y2JkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5MjA2NDgsImV4cCI6MjA1ODQ5NjY0OH0.S2oU_ftP3YUfWMAsDNSRzE6wjr5AeM7qFbeKJbBuuFo';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
