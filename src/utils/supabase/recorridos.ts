import { createClient } from "@supabase/supabase-js";

// Crear el cliente de Supabase con la URL y la clave pública
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function getRecorridos(token: string) {
  // Establecer la sesión con el token proporcionado
  supabase.auth.setSession({ access_token: token, refresh_token: "" }); // Si no tienes refresh_token, puede dejarlo vacío

  // Realizar la consulta a la base de datos
  const { data, error } = await supabase.from("recorridos").select("*");

  if (error) {
    console.error("Error fetching recorridos:", error);
    throw error;
  }

  console.log("Recorridos:", data);

  return data;
}
