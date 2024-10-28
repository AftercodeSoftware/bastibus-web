"use client";

import PieChart from "@/components/dashboard/PieChart";
import PropietariosCard from "@/components/dashboard/PropietariosCard";
import SimpleCard from "@/components/dashboard/SimpleCard";
import { useUser } from "@/context/UserContext";
import { Usuario } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { BusFront, CircleX } from "lucide-react";
import { useEffect } from "react";

interface DashboardData {
  cantidadIrregularidades: number;
  propietariosTotales: number;
  cantidadRecorridos: number;
  chart: {
    cantidadIrregularidades: number;
    cantidadMovimientos: number;
    movimientosPropietarios: number;
    movimientosAutorizados: number;
  };
  propietariosPendientes: Usuario[];
}

export default function Dashboard() {
  const { data, error, isLoading } = useQuery<DashboardData>({
    queryKey: ["dashboard-administrativo"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_IP}/dashboard/administrador`,
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
  const { user } = useUser();

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const chartData = data
    ? [
        {
          label: "Irregularidades",
          value: data.chart.cantidadIrregularidades,
          fill: "var(--color-irregularidades)",
        },
        // {
        //   label: "Movimientos",
        //   value: data.chart.cantidadMovimientos,
        //   fill: "var(--color-movimientos)",
        // },
        {
          label: "Propietarios",
          value: data.chart.movimientosPropietarios,
          fill: "var(--color-propietarios)",
        },
        {
          label: "Autorizados",
          value: data.chart.movimientosAutorizados,
          fill: "var(--color-autorizados)",
        },
      ]
    : [];

  return (
    <div className="chart-wrapper flex flex-col items-center gap-6 p-6 sm:p-8">
      <h1 className="text-black self-start text-2xl">
        Hola de nuevo,{" "}
        <b>
          {user?.nombre} {user?.apellido}
        </b>
      </h1>
      <div className="flex flex-row gap-6 w-full justify-between">
        <SimpleCard
          title="Usos inadecuados"
          number={data?.cantidadIrregularidades}
          icon={CircleX}
          subtitle="Ultimo uso inadecuado 12/10/2024"
        />
        <SimpleCard
          title="Propietarios totales"
          number={data?.propietariosTotales}
          icon={CircleX}
          subtitle="Ultimo propietario agregado 12/10/2024"
        />
        <SimpleCard
          title="Cantidad de recorridos"
          number={data?.cantidadRecorridos}
          icon={BusFront}
          subtitle="Ultimo recorrido 12/10/2024 12:00"
        />
      </div>
      <div className="flex flex-row gap-6 w-full">
        <PieChart chartData={chartData} />
        <PropietariosCard propietarios={data?.propietariosPendientes} />
      </div>
    </div>
  );
}
