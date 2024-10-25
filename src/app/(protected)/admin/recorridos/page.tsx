"use client";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function Recorridos() {
  type Recorrido = {
    id: number;
    tipo: "reducido" | "normal" | "express";
    salidabarrio: string;
    llegadadestino: string;
    salidadestino: string;
    llegadabarrio: string;
    observacion: string | null;
    created_at: string;
  };

  const { data, error, isLoading } = useQuery<Recorrido[]>({
    queryKey: ["recorridos"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_IP}/recorridos`,
        {
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const cardColors = {
    reducido: "#A0334E",
    normal: "#3362A0",
    express: "#6524AA",
  };
  return (
    <div className="m-28">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 text-center">
                Tipo
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Salida del Barrio
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Llegada al Destino
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Salida del Destino
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Llegada al Barrio
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Observación
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((recorrido: Recorrido, index: number) => (
              <tr
                key={index}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 border-b-2"
              >
                <td className="px-6 py-4 text-center">
                  <span
                    className="px-2 py-1.5 text-white font-bold rounded-2xl"
                    style={{
                      backgroundColor:
                        cardColors[recorrido.tipo as keyof typeof cardColors],
                    }}
                  >
                    {recorrido.tipo.charAt(0).toUpperCase() +
                      recorrido.tipo.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  {recorrido.salidabarrio.slice(0, -3)}
                </td>
                <td className="px-6 py-4 text-center">
                  {recorrido.llegadadestino.slice(0, -3)}
                </td>
                <td className="px-6 py-4 text-center">
                  {recorrido.salidadestino.slice(0, -3)}
                </td>
                <td className="px-6 py-4 text-center">
                  {recorrido.llegadabarrio.slice(0, -3)}
                </td>
                <td className="px-6 py-4 text-center">
                  {recorrido.observacion || "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
