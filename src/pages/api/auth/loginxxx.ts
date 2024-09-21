import { Propietario, Usuario } from "@/types/types";
import cookie from "cookie";
import { jwtDecode } from "jwt-decode";
import { NextApiRequest, NextApiResponse } from "next";

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

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  const body = JSON.parse(req.body);
  const { email, password } = body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const response = await fetch(`${process.env.SERVER_IP}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = (await response.json()) as LoginResponse;
    // if (error || !data.session) {
    //   return res
    //     .status(401)
    //     .json({ error: error?.message || "Authentication failed" });
    // }
    // const { access_token, refresh_token } = data.session;

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("access_token", data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 7 días max age
        path: "/",
        domain:
          process.env.NODE_ENV === "production" ? ".vercel.app" : undefined,
        sameSite: "lax",
      })
    );

    return res.status(200).json({
      user: data.userData,
    });
  } catch (error) {
    console.error("Error signing in:", (error as Error).message);
    return res.status(500).json({ error: "Error loggin in" });
  }
}
