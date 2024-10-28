"use client";
import { BusRide } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const cardColors = {
  reducido: "#A0334E",
  normal: "#3362A0",
  express: "#6524AA",
};

export default function Recorridos() {
  const { data, error, isLoading } = useQuery<BusRide[]>({
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
  return (
    <div className="w-full h-full flex ">
      <div className="flex-1 relative overflow-x-auto sm:rounded-xl p-7">
        <table className="w-full h-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-2xl overflow-hidden">
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
            {data?.map((recorrido: BusRide, index: number) => (
              <tr
                key={index}
                className="odd:bg-white even:bg-gris-50/5 odd:dark:bg-gray-900 border-b-2"
              >
                <td className="px-6 py-4 text-center">
                  <span
                    className="px-2 py-1.5 text-white font-bold rounded-sm"
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
