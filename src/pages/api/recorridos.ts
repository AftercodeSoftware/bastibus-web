import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import { getRecorridos } from "@/utils/supabase/recorridos";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Extraer el token de las cookies
    const cookies = cookie.parse(req.headers.cookie || "");
    const accessToken = cookies.access_token;

    if (!accessToken) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    // Obtener los recorridos usando el token
    const recorridos = await getRecorridos(accessToken);

    res.status(200).json({ recorridos, success: true });
  } catch (error) {
    console.error("Error fetching recorridos:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
