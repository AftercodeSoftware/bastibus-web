"use client";

import Button from "@/components/Button";
import { Input } from "@/components/ui/input";
import { signUp } from "@/utils/clientPromises";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

export const FormDataSchema = z.object({
  manzana: z.string().min(1, "La manzana es requerida."),
  lote: z.string().min(1, "El lote es requerido."),
  nombre: z.string().min(1, "El nombre es requerido."),
  apellido: z.string().min(1, "El apellido es requerido."),
  dni: z.string().min(1, "El DNI es requerido."),
  email: z
    .string()
    .email("El email no es válido.")
    .min(1, "El email es requerido."),
  phone: z.string().min(1, "El celular es requerido."),
});

export type SignUpInputs = z.infer<typeof FormDataSchema>;

function SignUpForm() {
  const [globalError, setGlobalError] = useState<string>();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpInputs>({
    resolver: zodResolver(FormDataSchema),
  });

  const processForm: SubmitHandler<SignUpInputs> = async (data) => {
    try {
      const result = await signUp(data);
      if (result.error) {
        throw new Error(result.error);
      }
      router.replace("/sign-up/success");
    } catch (e: any) {
      setGlobalError(e.message);
    } finally {
      reset();
    }
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
          <label htmlFor="lote" className="font-medium">
            Lote *
          </label>
          <Input
            {...register("lote")}
            type="text"
            name="lote"
            placeholder="Lote..."
          />
          {errors.lote?.message && (
            <p className="text-sm text-error">{errors.lote.message}</p>
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
        <label htmlFor="phone" className="font-medium">
          Celular
        </label>
        <Input
          {...register("phone")}
          type="text"
          name="phone"
          placeholder="Celular..."
        />
        {errors.phone?.message && (
          <p className="text-sm text-error">{errors.phone.message}</p>
        )}
      </div>
      {globalError && (
        <p className="text-error font-semibold text-sm self-center">
          {globalError}
        </p>
      )}

      <Button className="w-full">Solicitar registro</Button>
    </form>
  );
}

export default SignUpForm;
