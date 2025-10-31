@echo off
REM Setup script to create .env.local file with Supabase credentials for Windows

(
echo VITE_SUPABASE_URL=https://jzfqhflssywbciwqfjan.supabase.co
echo VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp6ZnFoZmxzc3l3YmNpd3FmamFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0MzQzODQsImV4cCI6MjA3NjAxMDM4NH0.FqKuytv_--dupkvByIdP3yKKUxQ5j6YRBP4lyk4GZhk
) > .env.local

echo.
echo ✅ .env.local file created successfully!
echo Please restart your dev server: npm run dev
pause




