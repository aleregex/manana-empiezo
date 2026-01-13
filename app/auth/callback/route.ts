import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Callback para Google OAuth de Supabase
 * Maneja la autenticación y redirige al usuario
 */
export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        auth: {
          persistSession: false,
        },
      }
    );

    // Intercambiar el código por una sesión
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Redirigir a login, que manejará el hash y redirigirá a home
      return NextResponse.redirect(new URL("/login", requestUrl.origin));
    }
  }

  // Redirigir a login (el hash con el token vendrá en la URL)
  return NextResponse.redirect(new URL("/login", requestUrl.origin));
}
