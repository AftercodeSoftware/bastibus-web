import { Usuario } from "@/types/types";

export const crearPropietario = async (propietario: Usuario) => {
  try {
    const manzana = propietario.manzana || "";
    const lote = propietario.lote || "";

    const usuario = {
      ...propietario,
      rol: "propietario",
      password: manzana + lote,
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_IP}/propietarios/create`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(usuario),
      }
    );

    return response;
  } catch (error) {
    console.error(error);
  }
};
