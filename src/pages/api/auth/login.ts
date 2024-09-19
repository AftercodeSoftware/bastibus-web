import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

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
    const { token, role } = (await response.json()) as {
      token: string;
      role: string;
    };

    // if (error || !data.session) {
    //   return res
    //     .status(401)
    //     .json({ error: error?.message || "Authentication failed" });
    // }
    // const { access_token, refresh_token } = data.session;

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        // 7 días max age
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      })
    );

    // res.setHeader(
    //   "Set-Cookie",
    //   cookie.serialize("refresh_token", refresh_token, {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === "production",
    //     maxAge: 60 * 60 * 24 * 7, // 7 días
    //     path: "/",
    //   })
    // );

    // try {
    //   const decodedToken = jwtDecode<{ user_role: string }>(access_token);

    //   role = decodedToken.user_role;

    //   res.setHeader(
    //     "Set-Cookie",
    //     cookie.serialize("role", role, {
    //       httpOnly: true,
    //       secure: process.env.NODE_ENV === "production",
    //       maxAge: 60 * 60 * 24 * 7, // 7 días
    //       path: "/",
    //     })
    //   );
    // } catch (decodeError) {
    //   console.error("Error al decodificar el token JWT", decodeError);
    // }

    return res.status(200).json({
      role,
    });
    // return res.status(200).json({
    //   role,
    // });
  } catch (error) {
    console.error("Error signing in:", (error as Error).message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
