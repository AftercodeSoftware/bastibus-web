import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Usuario } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { ShieldPlus, Trash2, UserCog } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

import { crearPropietario } from "@/lib/createNewPropietario";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

export const FormDataSchema = z.object({
  id: z.string(),
  manzana: z.string().min(1, "La manzana es requerida."),
  lote: z.string().min(1, "La casa es requerida."),
  nombre: z.string().min(1, "El nombre es requerido."),
  apellido: z.string().min(1, "El apellido es requerido."),
  dni: z.string().min(1, "El DNI es requerido."),
  email: z
    .string()
    .email("El email no es válido.")
    .min(1, "El email es requerido."),
  phone: z.string(),
});
type Inputs = z.infer<typeof FormDataSchema>;

export default function PropietariosCard({
  propietarios,
}: {
  propietarios?: Usuario[];
}) {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema),
  });

  const { data, error, isLoading } = useQuery<Usuario[]>({
    queryKey: ["propietarios-pendientes"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_IP}/propietarios/pendientes`,
        {
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  if (data) {
  }

  const processForm: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await crearPropietario(data as Usuario);
      if (!response) {
        return;
      }
      // console.log(response);
      if (response.ok) {
        // Close the Dialog here
        document
          .querySelector('[data-state="open"]')
          ?.setAttribute("data-state", "closed");
      }
    } catch (e) {
      console.error(e);
    } finally {
      reset();
    }
  };

  return (
    <Card x-chunk="dashboard-05-chunk-1" className="flex-1">
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <CardTitle className="">Propietarios pendientes</CardTitle>

          <UserCog className="text-2xl text-muted-foreground" />
        </div>
        <p className="text-xs text-muted-foreground">
          {data?.length} propietario/s pendientes de usuario
        </p>
      </CardHeader>
      <CardContent>
        <div>
          {propietarios?.map((propietario) => (
            <article className="flex gap-8 items-center" key={propietario.id}>
              <p className="text-sm">{propietario.nombre}</p>
              <p className="text-sm text-muted-foreground">{propietario.dni}</p>
              <p className="text-sm text-muted-foreground">
                {propietario.manzana}
              </p>
              <p className="text-sm text-muted-foreground">
                {propietario.lote}
              </p>
              <p className="text-sm text-muted-foreground">
                {propietario.email}
              </p>
              <p className="text-sm text-muted-foreground">
                {propietario.phone}
              </p>
              <aside className="flex items-center gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <ShieldPlus className="text-green-700 h-5" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] bg-white">
                    <DialogHeader>
                      <DialogTitle className="text-black">
                        Nuevo propietario
                      </DialogTitle>
                      <DialogDescription>
                        Revisá los datos del propietario antes de aprobarlo
                      </DialogDescription>
                    </DialogHeader>
                    <form
                      onSubmit={handleSubmit(processForm)}
                      className="text-gris-600 w-full flex flex-col gap-6 mt-4"
                    >
                      <div className="flex gap-4">
                        <div>
                          <Input
                            {...register("id")}
                            type="hidden"
                            defaultValue={propietario.id} // Aquí pasás el ID del propietario
                          />

                          <label
                            htmlFor="manzana"
                            className="font-medium text-sm"
                          >
                            Manzana *
                          </label>
                          <Input
                            {...register("manzana")}
                            type="number"
                            name="manzana"
                            defaultValue={propietario.manzana}
                            placeholder="Manzana..."
                          />
                          {errors.manzana?.message && (
                            <p className="text-sm text-error">
                              {errors.manzana.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <label htmlFor="casa" className="font-medium text-sm">
                            Lote *
                          </label>
                          <Input
                            {...register("lote")}
                            type="number"
                            name="casa"
                            defaultValue={propietario.lote}
                            placeholder="Lote..."
                          />
                          {errors.lote?.message && (
                            <p className="text-sm text-error">
                              {errors.lote.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div>
                        <label htmlFor="nombre" className="font-medium text-sm">
                          Nombre *
                        </label>
                        <Input
                          {...register("nombre")}
                          type="text"
                          name="nombre"
                          defaultValue={propietario.nombre}
                          placeholder="Nombre..."
                        />
                        {errors.nombre?.message && (
                          <p className="text-sm text-error">
                            {errors.nombre.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="apellido"
                          className="font-medium text-sm"
                        >
                          Apellido *
                        </label>
                        <Input
                          {...register("apellido")}
                          type="text"
                          name="apellido"
                          defaultValue={propietario.apellido}
                          placeholder="Apellido..."
                        />
                        {errors.apellido?.message && (
                          <p className="text-sm text-error">
                            {errors.apellido.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="dni" className="font-medium text-sm">
                          DNI / Pasaporte *
                        </label>
                        <Input
                          {...register("dni")}
                          type="text"
                          name="dni"
                          defaultValue={propietario.dni}
                          placeholder="DNI..."
                        />
                        {errors.dni?.message && (
                          <p className="text-sm text-error">
                            {errors.dni.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="email" className="font-medium text-sm">
                          Correo electrónico *
                        </label>
                        <Input
                          {...register("email")}
                          type="text"
                          name="email"
                          defaultValue={propietario.email}
                          placeholder="Correo..."
                        />
                        {errors.email?.message && (
                          <p className="text-sm text-error">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="celular"
                          className="font-medium text-sm"
                        >
                          Celular
                        </label>
                        <Input
                          {...register("phone")}
                          type="number"
                          name="celular"
                          defaultValue={propietario.phone}
                          placeholder="Celular..."
                        />
                        {errors.phone?.message && (
                          <p className="text-sm text-error">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>

                      <DialogFooter>
                        <Button type="submit">Crear propietario</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
                <button className=" p-2 rounded-xl border border-gris-200">
                  <Trash2 className="text-error h-5" />
                </button>
              </aside>
            </article>
          ))}
        </div>
        {/* <div className="text-xs text-muted-foreground">{subtitle}</div> */}
      </CardContent>
      {/* <CardFooter>
         <Progress value={25} aria-label="25% increase" /> 
      </CardFooter> */}
    </Card>
  );
}
