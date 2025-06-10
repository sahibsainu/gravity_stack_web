import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Define environment variables for use in the app
    'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(process.env.VITE_SUPABASE_URL),
    'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(process.env.VITE_SUPABASE_ANON_KEY),
    'import.meta.env.LOGIN_URL': JSON.stringify(process.env.LOGIN_URL),
    'import.meta.env.COMPUTE_URL': JSON.stringify(process.env.COMPUTE_URL),
    'import.meta.env.GRAVITY_USERNAME': JSON.stringify(process.env.GRAVITY_USERNAME),
    'import.meta.env.GRAVITY_PASSWORD': JSON.stringify(process.env.GRAVITY_PASSWORD),
    'import.meta.env.GRAVITY_PROJECT_ID': JSON.stringify(process.env.GRAVITY_PROJECT_ID),
  },
  server: {
    host: true, // Needed for WebContainer
    // Removed proxy configuration for OpenStack URLs
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
