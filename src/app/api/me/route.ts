import { jwtDecode } from "jwt-decode";
import { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

interface JWTToken {
  rol: string;
  email: string;
  id: string;
  iat: number;
  exp: number;
}

export interface UserResponse {
  user?: JWTToken;
  success?: boolean;
  error?: string;
}

export function GET(req: NextRequest, res: NextResponse) {
  const accessToken = req.cookies.get("access_token");

  console.error("Access token", accessToken);

  if (!accessToken) {
    return NextResponse.json(
      { error: "Not authenticated" },
      {
        status: 401,
      }
    );
  }

  try {
    const decodedToken = jwtDecode<JWTToken>(accessToken.value);

    const response: UserResponse = {
      user: decodedToken,
      success: true,
    };
    return NextResponse.json(response, {
      status: 200,
    });
  } catch (error) {
    const response: UserResponse = {
      error: "Internal Server Error",
    };

    return NextResponse.json(response, {
      status: 405,
    });
  }
}
