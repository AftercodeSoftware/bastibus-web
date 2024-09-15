import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/utils/supabase/client";
import { jwtDecode } from "jwt-decode";
import cookie from "cookie";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.session) {
      return res
        .status(401)
        .json({ error: error?.message || "Authentication failed" });
    }

    let role = "";
    const { access_token, refresh_token } = data.session;

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("access_token", access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 7 días
        path: "/",
      })
    );

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("refresh_token", refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 7 días
        path: "/",
      })
    );

    try {
      const decodedToken = jwtDecode<{ user_role: string }>(access_token);

      role = decodedToken.user_role;

      res.setHeader(
        "Set-Cookie",
        cookie.serialize("role", role, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 60 * 24 * 7, // 7 días
          path: "/",
        })
      );
    } catch (decodeError) {
      console.error("Error al decodificar el token JWT", decodeError);
    }

    return res.status(200).json({
      user: data.user,
      session: data.session,
      role,
    });
  } catch (error) {
    console.error("Error signing in:", (error as Error).message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
