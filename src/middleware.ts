import { jwtDecode } from "jwt-decode";
// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

interface JWTToken {
  rol: string;
  email: string;
  id: string;
  iat: number;
  exp: number;
}

export function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token");

  console.log("TOKEN!", token);

  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
  const isPropetarioRoute = req.nextUrl.pathname.startsWith("/propietario");

  try {
    const decodedToken = jwtDecode<JWTToken>(token.value);

    if (decodedToken.rol === "administrador") {
      if (isPropetarioRoute) {
        return NextResponse.redirect(new URL("/admin", req.url));
      }
      return NextResponse.next();
    }
    if (decodedToken.rol === "propietario") {
      if (isAdminRoute) {
        return NextResponse.redirect(new URL("/propietario", req.url));
      }
      return NextResponse.next();
    }
  } catch (decodeError) {
    console.error("Error al decodificar el token JWT", decodeError);
    return;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/propietario/:path*"],
};
