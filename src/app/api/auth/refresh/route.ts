import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const BASEURL = process.env.BASEURL; // Ensure this is set in your .env file
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  // Check if refresh token exists
  if (!refreshToken) {
    return NextResponse.json({ detail: "No refresh token" }, { status: 401 });
  }

  try {
    const response = await fetch(`${BASEURL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { detail: errorData.detail || "Failed to refresh token" },
        { status: response.status }
      );
    }

    const data = await response.json();
    const newAccessToken = data.access_token;
    const newRefreshToken = refreshToken;

    // Prepare response and set new cookies
    const res = NextResponse.json({ detail: "Token refreshed" });
    res.cookies.set("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 15, // 15 minutes
      path: "/",
    });
    res.cookies.set("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });

    return res;
  } catch (error) {
    console.error("Error refreshing token:", error);
    return NextResponse.json(
      { detail: "Failed to refresh token" },
      { status: 500 }
    );
  }
}
