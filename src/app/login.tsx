"use server";

import { Propietario, Usuario } from "@/types/types";
import cookie from "cookie";
import { jwtDecode } from "jwt-decode";
import { z } from "zod";

const FormDataSchema = z.object({
  email: z
    .string()
    .email("El email no es válido.")
    .min(1, "El email es requerido."),
  password: z
    .string()
    .min(1, "La contraseña es requerida.")
    .min(4, { message: "Tiene que tener al menos 6 characters." }),
});

type Inputs = z.infer<typeof FormDataSchema>;

interface JWTToken {
  rol: string;
  email: string;
  id: string;
  iat: number;
  exp: number;
}

interface LoginResponse {
  token: string;
  rol: string;
  userId: string;
  userData: Usuario | Propietario;
}

// El método POST debe ser exportado como una función nombrada en el App Router
export async function login(data: Inputs) {
  const result = FormDataSchema.safeParse(data);

  if (result.error) {
    return { success: false, error: result.error.format() };
  }

  const { email, password } = result.data;

  try {
    const response = await fetch(`${process.env.SERVER_IP}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      return {
        success: false,
        error: "El correo y/o la contraseña no son válidos.",
      };
    }

    const data = (await response.json()) as LoginResponse;

    const cookieSerialized = cookie.serialize("access_token", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 días max age
      path: "/",
      domain: process.env.NODE_ENV === "production" ? ".vercel.app" : undefined,
      sameSite: "lax",
    });

    const responseHeaders = new Headers();
    responseHeaders.append("Set-Cookie", cookieSerialized);

    return {
      success: true,
      rol: data.rol,
    };
  } catch (error) {
    return { success: false, error: "Internal Server Error" };
  }
}
