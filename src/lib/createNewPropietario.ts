import { Propietario } from "@/types/types";

export const crearPropietario = async (propietario: Propietario) => {
  try {
    const usuario = (propietario = {
      ...propietario,
      rol: "propietario",
      password: propietario.manzana + propietario.lote,
    });

    console.log(usuario);

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
