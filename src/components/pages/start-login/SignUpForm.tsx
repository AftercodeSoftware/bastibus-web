"use client";

import Button from "@/components/Button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect, useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

export const FormDataSchema = z.object({
  manzana: z.string().min(1, "La manzana es requerida."),
  casa: z.string().min(1, "La casa es requerida."),
  nombre: z.string().min(1, "El nombre es requerido."),
  apellido: z.string().min(1, "El apellido es requerido."),
  dni: z.string().min(1, "El DNI es requerido."),
  email: z
    .string()
    .email("El email no es válido.")
    .min(1, "El email es requerido."),
  celular: z.string(),
});

type Inputs = z.infer<typeof FormDataSchema>;

function SignUpForm() {
  const [data, setData] = useState<Inputs>();
  const [generalError, setGeneralError] = useState<string>();

  const router = useRouter();

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
    // const result = await login(data);

    if (!result) {
      return;
    }

    if (result.error) {
      setGeneralError(result.error.toString());
      return;
    }

    if (result.rol === "administrador") {
      router.push("/admin/dashboard");
    } else if (result.rol === "propietario") {
      router.push("/propietario");
    }

    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(processForm)}
      className="text-gris-600 w-full flex flex-col gap-6 mt-4"
    >
      <div className="flex gap-4">
        <div>
          <label htmlFor="manzana" className="font-medium">
            Manzana *
          </label>
          <Input
            {...register("manzana")}
            type="text"
            name="manzana"
            placeholder="Manzana..."
          />
          {errors.manzana?.message && (
            <p className="text-sm text-error">{errors.manzana.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="casa" className="font-medium">
            Casa *
          </label>
          <Input
            {...register("casa")}
            type="text"
            name="casa"
            placeholder="Casa..."
          />
          {errors.casa?.message && (
            <p className="text-sm text-error">{errors.casa.message}</p>
          )}
        </div>
      </div>
      <div>
        <label htmlFor="nombre" className="font-medium">
          Nombre *
        </label>
        <Input
          {...register("nombre")}
          type="text"
          name="nombre"
          placeholder="Nombre..."
        />
        {errors.nombre?.message && (
          <p className="text-sm text-error">{errors.nombre.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="apellido" className="font-medium">
          Apellido *
        </label>
        <Input
          {...register("apellido")}
          type="text"
          name="apellido"
          placeholder="Apellido..."
        />
        {errors.apellido?.message && (
          <p className="text-sm text-error">{errors.apellido.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="dni" className="font-medium">
          DNI / Pasaporte *
        </label>
        <Input
          {...register("dni")}
          type="text"
          name="dni"
          placeholder="DNI..."
        />
        {errors.dni?.message && (
          <p className="text-sm text-error">{errors.dni.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="email" className="font-medium">
          Correo electrónico *
        </label>
        <Input
          {...register("email")}
          type="text"
          name="email"
          placeholder="Correo..."
        />
        {errors.email?.message && (
          <p className="text-sm text-error">{errors.email.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="celular" className="font-medium">
          Celular
        </label>
        <Input
          {...register("celular")}
          type="text"
          name="celular"
          placeholder="Celular..."
        />
        {errors.celular?.message && (
          <p className="text-sm text-error">{errors.celular.message}</p>
        )}
      </div>

      <Button className="w-full">Solicitar registro</Button>
    </form>
  );
}

export default SignUpForm;
