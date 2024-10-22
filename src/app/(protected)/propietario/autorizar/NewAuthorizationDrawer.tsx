"use client";

import Button from "@/components/Button";
import { FormField } from "@/components/FormField";
import PageContainer from "@/components/PageContainer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Drawer } from "vaul";
import { z } from "zod";
import { DatePicker } from "./DatePicker";

interface AuthorizationModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function NewAuthorizationDrawer({
  open,
  setOpen,
}: AuthorizationModalProps) {
  return (
    <Drawer.Root open={open} onOpenChange={setOpen}>
      <Drawer.Trigger asChild>Open</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Handle />
        <Drawer.Content className="text-black text-center fixed z-10 bg-white border border-gray-200 border-b-none rounded-t-[10px] bottom-0 left-0 right-0 h-full max-h-[80%]">
          <Drawer.Handle className="my-4" />
          <PageContainer className="py-4">
            <h2 className="text-gris-800 font-medium text-xl">
              Autorizaciones
            </h2>
            <span className="text-base text-gris-400">
              Completa los datos de la persona a autorizar.
            </span>
            <NewAuthorizationForm />
          </PageContainer>
        </Drawer.Content>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
      </Drawer.Portal>
    </Drawer.Root>
  );
}

export const FormDataSchema = z.object({
  name: z
    .string()
    .min(1, "El nombre es requerido.")
    .min(3, "El nombre debe contener al menos 3 caracteres."),
  surname: z
    .string()
    .min(1, "El apellido es requerido.")
    .min(3, "El apellido debe contener al menos 3 caracteres."),
  dni: z
    .string()
    .min(1, "El DNI es requerido.")
    .min(8, "El DNI debe contener al menos 8 dígitos."),
  authorizationType: z.enum(["eventual", "frecuente"], {
    message: "Debes seleccionar un tipo de autorización.",
  }),
  date: z
    .date()
    .optional()
    .refine((date) => {
      if (!date) return true;
      return date >= new Date();
    }, "La fecha debe ser mayor o igual a la fecha actual."),
});

type Inputs = z.infer<typeof FormDataSchema>;

function NewAuthorizationForm() {
  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema),
  });

  const currentAuthorizationType = watch("authorizationType");

  const processForm: SubmitHandler<Inputs> = async (data) => {
    try {
      alert("Data submitted successfully, check the console for the data.");
      console.log(data);
    } catch (e) {
      console.log(e);
    } finally {
      reset();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(processForm)}
      className="text-left flex flex-col gap-3"
    >
      <FormField
        errorMessage={errors.name?.message}
        register={{ ...register("name") }}
        label="Nombre"
        required
        htmlFor="nombre"
      >
        <Input placeholder="Nombre..." id="nombre" />
      </FormField>
      <FormField
        errorMessage={errors.surname?.message}
        register={{ ...register("surname") }}
        label="Apellido"
        required
        htmlFor="apellido"
      >
        <Input placeholder="Apellido..." id="apellido" />
      </FormField>
      <FormField
        errorMessage={errors.dni?.message}
        register={{ ...register("dni") }}
        label="DNI"
        required
        htmlFor="dni"
      >
        <Input placeholder="DNI..." id="dni" />
      </FormField>
      <AuthorizationTypeSelector
        register={register}
        errorMessage={errors.authorizationType?.message}
      />

      {currentAuthorizationType === "eventual" && (
        <div className="mb-4">
          <p className="block text-sm font-medium text-muted-foreground mb-1">
            Fechas autorizadas
          </p>
          <Controller
            control={control}
            name="date"
            render={({ field }) => (
              <DatePicker
                date={field.value}
                setDate={(date) => field.onChange(date)}
              />
            )}
          />
          {errors.date && (
            <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
          )}
        </div>
      )}
      <Button type="submit">Enviar</Button>
    </form>
  );
}

function AuthorizationDateSelector({}) {
  return <div>asd</div>;
}

function AuthorizationTypeSelector({
  register,
  errorMessage,
}: {
  register: any;
  errorMessage?: string;
}) {
  return (
    <div className="mb-4">
      <label htmlFor="tipoAutorizacion" className="text-gris-600">
        Tipo de autorizacion
      </label>
      <div className="flex flex-row gap-2 mt-2">
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            value="eventual"
            id="eventual"
            {...register("authorizationType")}
          />
          <Label htmlFor="eventual">EVENTUAL</Label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            value="frecuente"
            id="frecuente"
            {...register("authorizationType")}
          />
          <Label htmlFor="frecuente">FRECUENTE</Label>
        </div>
      </div>
      {errorMessage && (
        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
      )}
    </div>
  );
}
