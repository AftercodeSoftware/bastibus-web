import { BasicUser } from "@/types/types";
import { motion } from "framer-motion";

import { Calendar, Trash2, TrashIcon } from "lucide-react";
import React from "react";

interface AuthorizedCardProps {
  id: number;
  nombre: string;
  apellido: string;
  dni: string;
  tipo: string;
  dia?: string;
  deleteHandler: () => void;
}

export default function AuthorizedCard({
  id,
  nombre,
  apellido,
  dni,
  tipo,
  dia,
  deleteHandler,
}: AuthorizedCardProps) {
  return (
    <div className="relative flex items-center px-6 pt-6 pb-7 justify-between rounded-xl border border-b-0 border-gris-200 shadow-lg overflow-hidden ">
      <div className="">
        <p className="font-bold text-lg">
          {nombre} {apellido}
        </p>
        <p className="text-sm text-gris-600">{dni}</p>
        {tipo === "eventual" && (
          <p className="flex gap-1 text-sm font-semibold text-gris-600 mt-3">
            <Calendar size={20} /> {dia}
          </p>
        )}
      </div>
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={deleteHandler}
        className=" px-3 py-3 rounded-xl border border-gris-200"
      >
        <Trash2 className="text-error" />
      </motion.button>
      <div
        style={{ backgroundColor: tipo === "eventual" ? "#3675C2" : "#D6973F" }}
        className="absolute bottom-0 left-0 h-3 bg-blue-500 w-full"
      ></div>
    </div>
  );
}
