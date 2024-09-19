// import cookie from "cookie";
// import { NextApiRequest, NextApiResponse } from "next";
// // import { jwtDecode } from "jwt-decode";

// export default async function GET(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     const cookies = cookie.parse(req.headers.cookie || "");
//     const accessToken = cookies.access_token;
//     const refreshToken = cookies.refresh_token;
//     const role = cookies.role;

//     if (!accessToken || !refreshToken) {
//       return res.status(401).json({ error: "Not authenticated" });
//     }

//     // const decodedToken = jwtDecode<{ user_role: string }>(accessToken);

//     console.log("ROL PARA HACER FETCH", role);

//     if (!accessToken) {
//       return res.status(401).json({ error: "Not authenticated" });
//     }

//     const recorridos = await getRecorridos(accessToken, refreshToken, role);

//     res.status(200).json({ recorridos, success: true });
//   } catch (error) {
//     console.error("Error fetching recorridos:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }
