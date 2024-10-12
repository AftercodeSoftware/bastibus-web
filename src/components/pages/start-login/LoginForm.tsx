"use client";

import Button from "@/components/Button";
import { Input } from "@/components/ui/input";
import { useUser } from "@/context/UserContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect, useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";
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
    .min(4, { message: "Tiene que tener al menos 4 caracteres." }),
});

type Inputs = z.infer<typeof FormDataSchema>;

function LoginForm() {
  const [data, setData] = useState<Inputs>();
  const [generalError, setGeneralError] = useState<string>();

  const router = useRouter();
  const { login } = useUser();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema),
  });

  const processForm: SubmitHandler<Inputs> = async (data) => {
    try {
      console.log("wait");
      await login(data.email, data.password);

      // if (!result) {
      //   console.log("Something went wrong");
      //   return;
      // }

      // if (result.error) {
      //   setGeneralError(result.error.toString());
      //   return;
      // }

      // if (result.rol === "administrador") {
      //   router.push("/admin");
      // } else if (result.rol === "propietario") {
      //   router.push("/propietario");
      // }
    } catch (e) {
      console.log(e);
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
          <label htmlFor="email" className="font-medium">
            Correo
          </label>
          <Input placeholder="Correo electrónico..." {...register("email")} />
          {errors.email?.message && (
            <p className="text-sm text-error">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="password" className="font-medium">
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
        {generalError && (
          <p className="text-sm text-error text-center font-medium">
            {generalError}
          </p>
        )}
        <Button className="w-full">Iniciar sesión</Button>
      </form>
    </div>
  );
}

export default LoginForm;
