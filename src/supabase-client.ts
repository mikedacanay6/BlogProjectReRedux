import { createClient } from "@supabase/supabase-js";

const supaBaseUrl = "https://oofbyrhxwuwxeevuagjq.supabase.co"
const supaBaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vZmJ5cmh4d3V3eGVldnVhZ2pxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyMzU1MzIsImV4cCI6MjA2NTgxMTUzMn0.qhbXopYnhD-rsCfwsLG00NBQQ-3wEam2uUOdoP3uVYM"

const supaBase = createClient(supaBaseUrl, supaBaseKey)

export default supaBase