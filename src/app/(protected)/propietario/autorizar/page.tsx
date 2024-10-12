"use client";

import { AuthorizationModal } from "@/components/pages/propietario/AuthorizationModal";
import { BasicUser } from "@/types/types";
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
    <main>
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
        className="w-full h-40 bg-gris-100"
        onClick={() => setModalOpen((prev) => !prev)}
      >
        Autorizaciones
      </button>

      <DeleteUserDrawer
        open={isDeletingUser}
        setOpen={setDeletingUser}
        user={userBeingDeleted}
      />
      {modalOpen && <p>modal abierto</p>}
      <AuthorizationModal open={modalOpen} setOpen={setModalOpen} />
    </main>
  );
}
