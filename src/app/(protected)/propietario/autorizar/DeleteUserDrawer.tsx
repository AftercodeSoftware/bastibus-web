"use client";

import PageContainer from "@/components/PageContainer";
import { BasicUser } from "@/types/types";
import { Drawer } from "vaul";

interface DeleteUserDrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  user: {
    id: string;
    name?: string;
  } | null;
}

export function DeleteUserDrawer({
  open,
  setOpen,
  user,
}: DeleteUserDrawerProps) {
  function handleClose() {
    setOpen(false);
  }

  function handleErase() {
    console.log("Erasing user");
    setOpen(false);
  }

  return (
    <Drawer.Root open={user !== null && open} onOpenChange={setOpen}>
      <Drawer.Trigger asChild>Open</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Handle />
        <Drawer.Content className="text-black text-center fixed flex flex-col z-10 bg-white border-t-2 border-t-gris-400 rounded-t-[10px] bottom-0 left-0 right-0 h-full max-h-[25%]">
          <PageContainer>
            <span className="text-xl">
              ¿Seguro que deseas eliminar a <b>{user?.name || user?.id}</b>?
            </span>
            <div className="mt-10 w-full flex justify-end gap-4">
              <button onClick={handleClose} className="mr-2">
                No, gracias
              </button>
              <button
                onClick={handleErase}
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
