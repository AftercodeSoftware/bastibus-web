"use client";
import SignInForm from "@/components/SignInForm";
import { createClient, Session } from "@supabase/supabase-js";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

// Inicializar el cliente de Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Home() {
  const [session, setSession] = useState<Session | null>(null);

  // Función para iniciar sesión
  async function signInWithEmail() {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: "germhidalgo@gmail.com",
        password: "44140249",
      });

      if (error) {
        console.error(error);
        return;
      }

      if (data?.session) {
        setSession(data.session);
        const { access_token } = data.session;

        // Decodificar el token JWT
        try {
          const decodedToken = jwtDecode(access_token);
          console.log("Token decodificado:", decodedToken);
          console.log((decodedToken as { user_role: string }).user_role);
          // setUserRole(role);
        } catch (decodeError) {
          console.error("Error al decodificar el token JWT", decodeError);
        }
      }
    } catch (e) {
      console.error("Error inesperado", e);
    }
  }

  useEffect(() => {
    signInWithEmail();

    console.log("Sesión:", session);
  }, []);

  return (
    <>
      <div className="w-full h-fit p-4 bg-gris-950">
        <h1 className="text-verde-100 text-2xl font-light">Aftercode</h1>
        <h1 className="text-verde-200 text-2xl font-normal">Aftercode</h1>
        <h1 className="text-verde-300 text-2xl font-medium">Aftercode</h1>
        <h1 className="text-verde-400 text-2xl font-semibold">Aftercode</h1>
        <h1 className="text-verde-500 text-2xl font-bold">Aftercode</h1>
        <h1 className="text-verde-600 text-2xl font-extrabold">Aftercode</h1>
        <h1 className="text-verde-700 text-2xl font-black">Aftercode</h1>
      </div>
      <SignInForm />
    </>
  );
}
