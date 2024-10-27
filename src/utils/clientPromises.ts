"use client";

import { AuthorizationInputs } from "@/app/(protected)/propietario/autorizar/NewAuthorizationDrawer";
import { BusRide } from "@/types/types";

export async function getRecorridos(): Promise<BusRide[]> {
  return fetch(`${process.env.NEXT_PUBLIC_SERVER_IP}/recorridos` || "", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then((res) => res.json());
}

export async function getUltimosViajes(amount?: number) {
  let url = `${process.env.NEXT_PUBLIC_SERVER_IP}/movimientos/propietario`;
  if (amount) {
    const query = new URLSearchParams({ limit: amount.toString() });
    url += "?" + query.toString();
  }

  return fetch(url || "", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then((res) => res.json());
}

export async function getAutorizados() {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP}/autorizaciones/propietario` || "",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  ).then((res) => res.json());
}

export async function addAutorizado(data: AuthorizationInputs) {
  const sendData = {
    nombreVisita: data.name,
    apellidoVisita: data.surname,
    dniVisita: data.dni,
    tipoAutorizacion: data.authorizationType,
    dia: data.date,
    desde: data.date,
    hasta: data.date,
  };

  return fetch(`${process.env.NEXT_PUBLIC_SERVER_IP}/autorizaciones/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(sendData),
  }).then((res) => res.json());
}

export async function deleteAutorizado(id: number) {
  return fetch(`${process.env.NEXT_PUBLIC_SERVER_IP}/autorizaciones/${id}`, {
    method: "DELETE",
    credentials: "include",
  }).then((res) => res.json());
}
