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
    console.log("Formulario enviado:", data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(fnOnSubmit)}>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Nombre</FormLabel>
              <FormControl>
                <Input
                  className="font-clash font-normal text-md sm:text-xl bg-black block text-white bg-opacity-5 justify-between text-left gap-4 border-solid border-2 border-neon rounded-xl items-center px-4 py-1.5 shadow-[5px_5px_rgba(0,_98,_90,_0.4),_10px_10px_rgba(0,_98,_90,_0.3),_15px_15px_rgba(0,_98,_90,_0.2),_20px_20px_rgba(0,_98,_90,_0.1),_25px_25px_rgba(0,_98,_90,_0.05)]"
                  placeholder="Gerardo"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-400 font-bold" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Email</FormLabel>
              <FormControl>
                <Input
                  className="font-clash font-normal text-md sm:text-xl bg-black block text-white bg-opacity-5 justify-between text-left gap-4 border-solid border-2 border-neon rounded-xl items-center px-4 py-1.5 shadow-[5px_5px_rgba(0,_98,_90,_0.4),_10px_10px_rgba(0,_98,_90,_0.3),_15px_15px_rgba(0,_98,_90,_0.2),_20px_20px_rgba(0,_98,_90,_0.1),_25px_25px_rgba(0,_98,_90,_0.05)]"
                  placeholder="gerardo@gmail.com"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-400 font-bold" />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button
            type="submit"
            className="mt-4 font-clash font-medium text-md sm:text-xl bg-neon block text-white bg-opacity-5 justify-between text-center gap-4 border-solid border-2 border-neon  items-center px-4 py-1.5 hover:shadow-[_0px_0px_15px_5px_rgba(0,255,174,0.2)] hover:bg-darkneon "
          >
            Iniciar
          </Button>
        </div>
      </form>
    </Form>
  );
}
