import { createClient } from "@supabase/supabase-js";

// Usar valores dummy para build si no hay variables de entorno
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key";

/**
 * Cliente de Supabase para uso en el frontend
 *
 * IMPORTANTE: Asegúrate de crear un archivo .env.local con:
 * NEXT_PUBLIC_SUPABASE_URL=your-url
 * NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

// Helper para verificar si Supabase está configurado correctamente
export const isSupabaseConfigured = () => {
  return (
    supabaseUrl !== "https://placeholder.supabase.co" &&
    supabaseAnonKey !== "placeholder-key"
  );
};
