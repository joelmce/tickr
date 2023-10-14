import { createClient } from '@supabase/supabase-js';

const supabase = createClient("https://ojkjudjdueoozllmzmvl.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qa2p1ZGpkdWVvb3psbG16bXZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY3NDkzMzgsImV4cCI6MjAxMjMyNTMzOH0.d8MMCasHGy9APquKkbEe_7PdAydbP0W9h-8PiSTVDHo");

export { supabase };
