"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function Horarios() {
  const { isPending, error, data } = useQuery({
    queryKey: ["recorridos"],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_SERVER_IP}/api/recorridos` || "", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }).then((res) => res.json()),
  });

  return (
    <div>
      Horarios
      <div className="flex flex-col gap-3">
        {data?.map((recorrido: any) => (
          <div
            key={"recorrido-" + recorrido.id}
            className="flex flex-col gap-1"
          >
            <span>{recorrido.llegadabarrio}</span>
            <span>{recorrido.llegadadestino}</span>
            <span>{recorrido.salidabarrio}</span>
            <span>{recorrido.salidadestino}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
