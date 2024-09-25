"use client";

import PageContainer from "@/components/PageContainer";
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
        <Drawer.Content className="fixed flex flex-col z-10 bg-white border border-gray-200 border-b-none rounded-t-[10px] bottom-0 left-0 right-0 h-full max-h-[80%]">
          <PageContainer>
            <p>XD</p>
          </PageContainer>
        </Drawer.Content>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
      </Drawer.Portal>
    </Drawer.Root>
  );
}
