"use client";
import Container from "@/components/Container";
import Input from "@/components/Input";
import SignInForm from "@/components/SignInForm";
import Link from "next/link";

export default function Home() {
  // const [session, setSession] = useState<Session | null>(null);

  // Función para iniciar sesión
  // async function signInWithEmail() {
  //   try {
  //     const { data, error } = await supabase.auth.signInWithPassword({
  //       email: "germhidalgo@gmail.com",
  //       password: "44140249",
  //     });

  //     if (error) {
  //       console.error(error);
  //       return;
  //     }

  //     if (data?.session) {
  //       console.log("Sesión iniciada:", data);
  //       const { access_token } = data.session;

  //       // Decodificar el token JWT
  //       try {
  //         const decodedToken = jwtDecode(access_token);
  //         console.log("Token decodificado:", decodedToken);
  //         console.log((decodedToken as { user_role: string }).user_role);
  //         // setUserRole(role);
  //       } catch (decodeError) {
  //         console.error("Error al decodificar el token JWT", decodeError);
  //       }
  //     }
  //   } catch (e) {
  //     console.error("Error inesperado", e);
  //   }
  // }

  // useEffect(() => {
  //   signInWithEmail();

  //   console.log("Sesión:", session);
  // }, []);

  return (
    <Container>
      <Link href="/login" className="text-gris-950 text-4xl">
        Login
      </Link>
    </Container>
  );
}
