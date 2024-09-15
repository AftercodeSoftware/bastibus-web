import { createClient } from "@supabase/supabase-js";

// Crear el cliente de Supabase con la URL y la clave pública
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function getRecorridos(
  token: string,
  refresh_token: string,
  role: string
) {
  // Establecer la sesión con el token proporcionado
  const { data: sessionData, error: sessionError } =
    await supabase.auth.setSession({ access_token: token, refresh_token });
  if (sessionError) {
    console.error("Error setting session:", sessionError);
  } else {
    console.log("Session data:", sessionData);
  }
  supabase.auth.updateUser({
    data: { role },
  });

  // Realizar la consulta a la base de datos
  const { data, error } = await supabase.from("recorridos").select("*");

  if (error) {
    console.error("Error fetching recorridos:", error);
    throw error;
  }

  // console.log("Recorridos:", data);

  return data;
}
