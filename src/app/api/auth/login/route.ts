import { Propietario, Usuario } from "@/types/types";
import cookie from "cookie";
import { jwtDecode } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";

interface JWTToken {
  rol: string;
  email: string;
  id: string;
  iat: number;
  exp: number;
}

interface LoginResponse {
  token: string;
  role: string;
  userId: string;
  userData: Usuario | Propietario;
}

// El método POST debe ser exportado como una función nombrada en el App Router
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(`${process.env.SERVER_IP}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Authentication failed" },
        { status: 401 }
      );
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

    return NextResponse.json(
      {
        user: data.userData,
      },
      {
        status: 200,
        headers: responseHeaders,
      }
    );
  } catch (error) {
    console.error("Error signing in:", (error as Error).message);
    return NextResponse.json({ error: "Error logging in" }, { status: 500 });
  }
}
