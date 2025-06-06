import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const BASEURL = process.env.BASEURL;
  const { phone_number, password } = await request.json();

  try {
    const response = await fetch(`${BASEURL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone_number, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { detail: data.detail || "Failed: Please try again" },
        { status: 500 }
      );
    }

    // Set cookies from successful response
    const cookieStore = await cookies();
    cookieStore.set("accessToken", data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 15, // 15 minutes
    });

    cookieStore.set("refreshToken", data.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return NextResponse.json(
      {
        detail: data.detail,
        user: data.user,
      },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Authentication failed";
    return NextResponse.json({ detail: errorMessage }, { status: 401 });
  }
}
