import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import { supabase } from "@/utils/supabase/client";
import { jwtDecode } from "jwt-decode";
import cookie from "cookie";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    // Autenticar al usuario
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.session) {
      return res
        .status(401)
        .json({ error: error?.message || "Authentication failed" });
    }

    let role = "";
    const { access_token } = data.session;

    // Crear cliente de Supabase autenticado con el token de usuario
    // const supabaseClient = createAuthenticatedSupabaseClient(access_token);

    // Guardar el token en cookies
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("access_token", access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 7 días
        path: "/",
      })
    );

    // Decodificar el token JWT para obtener el rol del usuario
    try {
      const decodedToken = jwtDecode<{ user_role: string }>(access_token);
      role = decodedToken.user_role;
    } catch (decodeError) {
      console.error("Error al decodificar el token JWT", decodeError);
    }

    // Devolver los datos del usuario y la sesión
    return res.status(200).json({
      user: data.user,
      session: data.session,
      role,
    });
  } catch (error) {
    console.error("Error signing in:", (error as Error).message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// Función para crear un cliente de Supabase autenticado con el token de usuario
function createAuthenticatedSupabaseClient(access_token: string) {
  const supabaseClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  supabaseClient.auth.setSession({ access_token, refresh_token: "" });
  return supabaseClient;
}
