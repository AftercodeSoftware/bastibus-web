"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import { SupabaseAuthClient } from "@supabase/supabase-js/dist/module/lib/SupabaseAuthClient";

const formSchema = z.object({
  password: z.string().min(3, {
    message: "El nombre no puede estar vacío.",
  }),
  email: z
    .string()
    .min(1, { message: "El email no puede estar vacío " })
    .email("Ingresa un email válido."),
});

type FormData = z.infer<typeof formSchema>;

export default function SignInForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      email: "",
    },
  });

  async function fnOnSubmit(data: FormData) {
    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.status === 401) {
        console.error("Error de autenticación");
        return;
      }

      const responseData = await response.json();

      const recorridos = await fetch("/api/recorridos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const recorridosData = await recorridos.json();

      if (responseData.session) {
        // const user = SupabaseAuthClient.auth.user(); // Obtiene la información del usuario autenticado
        // return user ? user.id : null;
        // Almacenar datos en localStorage (no recomendado para datos sensibles)
        // localStorage.setItem("user", JSON.stringify(responseData.user));
        // localStorage.setItem("session", responseData.session);
        // Redirigir al usuario
        // router.push('/dashboard'); // Cambia a la ruta de destino deseada
      }
    } catch (error) {
      console.error("Error", error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(fnOnSubmit)}
        className="p-10 bg-white rounded-xl "
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel className="text-gris-800">Email</FormLabel>
              <FormControl>
                <Input
                  className="text-gris-600"
                  placeholder="placeholder"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-400 font-bold" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel className="text-gris-800">Contraseña</FormLabel>
              <FormControl>
                <Input
                  className="text-gris-600"
                  placeholder="placeholder"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-400 font-bold" />
            </FormItem>
          )}
        />
        <div className="flex justify-center mt-10">
          <Button type="submit" className="bg-verde-600 w-full">
            Iniciar
          </Button>
        </div>
      </form>
    </Form>
  );
}
