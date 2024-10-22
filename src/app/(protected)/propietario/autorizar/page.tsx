"use client";

import { NewAuthorizationDrawer } from "@/app/(protected)/propietario/autorizar/NewAuthorizationDrawer";
import Button from "@/components/Button";
import { BasicUser } from "@/types/types";
import { UserPlus } from "lucide-react";
import { useState } from "react";
import AuthorizedCard from "./AuthorizedCard";
import { DeleteUserDrawer } from "./DeleteUserDrawer";

const dummyAuthorizedUsers: BasicUser[] = [
  {
    id: "1",
    dni: "12345678",
    name: "Gabriel",
    type: "frecuente",
  },
  {
    id: "2",
    dni: "12345678",
    name: "Mati",
    type: "eventual",
  },
  {
    id: "3",
    dni: "12345678",
    name: "Ger",
    type: "eventual",
  },
];

export default function Autorizar() {
  const [modalOpen, setModalOpen] = useState(false);
  const [isDeletingUser, setDeletingUser] = useState(false);
  const [userBeingDeleted, setUserBeingDeleted] = useState<BasicUser | null>(
    null
  );

  return (
    <main className="relative h-full">
      <img
        src="/logo_trebol.png"
        alt="Imagen de perfil"
        width={50}
        height={50}
      />
      <section className="mt-10 flex flex-col gap-4">
        {dummyAuthorizedUsers.map((user) => (
          <AuthorizedCard
            key={user.id}
            id={user.id}
            name={user.name}
            dni={user.dni}
            type={user.type}
            deleteHandler={() => {
              setUserBeingDeleted(user);
              setDeletingUser(true);
            }}
          />
        ))}
      </section>
      <button
        className="absolute right-0 bottom-8 w-16 h-16 rounded-full flex items-center justify-center bg-verde-500"
        onClick={() => setModalOpen((prev) => !prev)}
      >
        <UserPlus className="h-8 w-8 text-white" />
      </button>

      <DeleteUserDrawer
        open={isDeletingUser}
        setOpen={setDeletingUser}
        user={userBeingDeleted}
      />
      <NewAuthorizationDrawer open={modalOpen} setOpen={setModalOpen} />
    </main>
  );
}
