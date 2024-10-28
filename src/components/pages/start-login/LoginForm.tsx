"use client";

import Button from "@/components/Button";
import { Input } from "@/components/ui/input";
import { useUser } from "@/context/UserContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

export const FormDataSchema = z.object({
  email: z
    .string()
    .email("El email no es válido.")
    .min(1, "El email es requerido."),
  password: z
    .string()
    .min(1, "La contraseña es requerida.")
    .min(2, { message: "Tiene que tener al menos 4 caracteres." }),
});

type Inputs = z.infer<typeof FormDataSchema>;

function LoginForm() {
  const { login } = useUser();
  const [globalError, setGlobalError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema),
  });

  useEffect(() => {
    if (errors) {
      setGlobalError(null);
    }
  }, [errors]);

  const processForm: SubmitHandler<Inputs> = async (data) => {
    try {
      await login(data.email, data.password);
    } catch (e: any) {
      setGlobalError(e.message);
    } finally {
      reset();
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(processForm)}
        className="text-gris-600 w-full flex flex-col gap-6 mt-4"
      >
        <div>
          <label htmlFor="email" className="font-normal text-sm">
            Correo
          </label>
          <Input placeholder="Correo electrónico..." {...register("email")} />
          {errors.email?.message && (
            <p className="text-sm text-error">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="password" className="font-normal text-sm">
            Contraseña
          </label>
          <Input
            type="password"
            placeholder="Contraseña..."
            {...register("password")}
          />
          {errors.password?.message && (
            <p className="text-sm text-error">{errors.password.message}</p>
          )}
        </div>
        {globalError && (
          <p className="text-error font-semibold text-sm self-center">
            {globalError}
          </p>
        )}

        <Button className="w-full   bg-verde-600">Iniciar sesión</Button>
      </form>
    </div>
  );
}

export default LoginForm;
