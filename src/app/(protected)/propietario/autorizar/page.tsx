"use client";

import { AuthorizationModal } from "@/components/pages/propietario/AuthorizationModal";
import { useState } from "react";

export default function Autorizar() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setModalOpen((prev) => !prev)}>abrir</button>
      {modalOpen && <p>modal abierto</p>}
      <AuthorizationModal open={modalOpen} setOpen={setModalOpen} />
    </div>
  );
}
