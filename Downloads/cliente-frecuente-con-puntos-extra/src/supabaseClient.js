import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qtkgtqxzkjcaotmfmogg.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0a2d0cXh6a2pjYW90bWZtb2dnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzODcyOTUsImV4cCI6MjA2NTk2MzI5NX0.2ofO3X8gKA7Pp180Y9lgy0hqrovv0zBEotDDuK7Q2L8";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
