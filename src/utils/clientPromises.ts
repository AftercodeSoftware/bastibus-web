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

export async function getUltimosViajes(
  userId: string | undefined,
  amount?: number
) {
  console.log(userId);
  if (!userId) {
    return ["No user ID provided"];
  }
  let url = `${process.env.NEXT_PUBLIC_SERVER_IP}/movimientos/propietario/${userId}`;
  if (amount) {
    const query = new URLSearchParams({ limit: amount.toString() });
    url += "?" + query.toString();
  }

  console.log("URL:", url);
  return fetch(url || "", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then((res) => res.json());
}
