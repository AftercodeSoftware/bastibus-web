"use client";

import PageContainer from "@/components/PageContainer";
import { Authorization, BasicUser } from "@/types/types";
import { deleteAutorizado } from "@/utils/clientPromises";
import { useQueryClient } from "@tanstack/react-query";
import { Drawer } from "vaul";

interface DeleteUserDrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  autorizacion: Authorization | null;
}

export function DeleteUserDrawer({
  open,
  setOpen,
  autorizacion,
}: DeleteUserDrawerProps) {
  const queryClient = useQueryClient();
  function handleClose() {
    setOpen(false);
  }

  function handleDelete() {
    if (!autorizacion) return;
    deleteAutorizado(autorizacion?.id);
    setTimeout(() => {
      queryClient.resetQueries({ queryKey: ["autorizados"], exact: true });
    }, 1500);
    setOpen(false);
  }

  return (
    <Drawer.Root open={autorizacion !== null && open} onOpenChange={setOpen}>
      <Drawer.Trigger asChild>Open</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Handle />
        <Drawer.Content className="text-black text-center fixed flex flex-col z-10 bg-white border-t-2 border-t-gris-400 rounded-t-[10px] bottom-0 left-0 right-0 h-full max-h-[25%]">
          <Drawer.Description className="hidden">
            Borrar autorizado
          </Drawer.Description>
          <Drawer.Title className="hidden">Borrar autorizado</Drawer.Title>
          <PageContainer>
            <span className="text-xl">
              ¿Seguro que deseas eliminar a{" "}
              <b>
                {autorizacion?.visita.nombre} {autorizacion?.visita.apellido}
              </b>
              ?
            </span>
            <div className="mt-10 w-full flex justify-end gap-4">
              <button onClick={handleClose} className="mr-2">
                No, gracias
              </button>
              <button
                onClick={handleDelete}
                className="bg-error px-4 py-3 text-white rounded-xl"
              >
                Eliminar
              </button>
            </div>
          </PageContainer>
        </Drawer.Content>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
      </Drawer.Portal>
    </Drawer.Root>
  );
}
