import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  // delete cookie
  console.log("?");
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("access_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: -1, // 7 días
      path: "/",
      sameSite: "lax",
    })
  );

  res.status(200).send("Signout");
}
