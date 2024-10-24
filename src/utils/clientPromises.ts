"use client";

export async function getRecorridos() {
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
