"use server";
import { JWTToken } from "@/types/types";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export async function getUser(): Promise<JWTToken | undefined> {
  const accessToken = cookies().get("access_token");
  if (accessToken) {
    const decodedToken = jwtDecode<JWTToken>(accessToken.value);
    return decodedToken;
  } else {
    return undefined;
  }
}
