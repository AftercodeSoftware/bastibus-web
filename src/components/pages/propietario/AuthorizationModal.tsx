"use client";

import PageContainer from "@/components/PageContainer";
import { Input } from "@/components/ui/input";
import { Drawer } from "vaul";

interface AuthorizationModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function AuthorizationModal({ open, setOpen }: AuthorizationModalProps) {
  return (
    <Drawer.Root open={open} onOpenChange={setOpen}>
      <Drawer.Trigger asChild>Open</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Handle />
        <Drawer.Content className="text-black text-center fixed z-10 bg-white border border-gray-200 border-b-none rounded-t-[10px] bottom-0 left-0 right-0 h-full max-h-[70%]">
          <Drawer.Handle className="my-4" />
          <PageContainer className="py-4">
            <h2 className="text-gris-800 font-medium text-xl">
              Autorizaciones
            </h2>
            <span className="text-base text-gris-400">
              Completa los datos de la persona a autorizar.
            </span>

            <form className="text-left flex flex-col gap-4">
              <div>
                <label htmlFor="nombre" className="text-gris-600">
                  Nombre *
                </label>
                <Input placeholder="Nombre..." />
              </div>
              <div>
                <label htmlFor="nombre" className="text-gris-600">
                  Apellido *
                </label>
                <Input placeholder="Apellido..." />
              </div>
              <div>
                <label htmlFor="nombre" className="text-gris-600">
                  DNI *
                </label>
                <Input placeholder="DNI..." />
              </div>
              <div>
                <label htmlFor="nombre" className="text-gris-600">
                  Tipo de autorizacion
                </label>
                <div className="flex gap-2 mt-2">
                  <div className="text-sm w-fit px-3 py-1 font-semibold text-white rounded-full bg-[#3675C2]">
                    EVENTUAL
                  </div>
                  <div className="text-sm w-fit px-3 py-1 font-semibold text-white rounded-full bg-[#D6973F]">
                    FRECUENTE
                  </div>
                </div>
              </div>
            </form>
          </PageContainer>
        </Drawer.Content>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
      </Drawer.Portal>
    </Drawer.Root>
  );
}
