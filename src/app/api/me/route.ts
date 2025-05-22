import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { refreshAccessToken } from "@/lib/refreshAuth";

export async function GET() {
  const BASEURL = process.env.BASEURL;
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("accessToken")?.value;

  if (!accessToken) {
    return NextResponse.json({ detail: "Not authenticated" }, { status: 401 });
  }

  try {
    let response = await fetch(`${BASEURL}/users/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 401) {
      const {
        accessToken: newAccessToken,
        refreshToken: existingRefreshToken,
      } = await refreshAccessToken();

      // Retry with new token
      response = await fetch(`${BASEURL}/users/me`, {
        headers: {
          Authorization: `Bearer ${newAccessToken}`,
        },
      });

      if (!response.ok) {
        return NextResponse.json(
          { detail: "Failed to fetch user data" },
          { status: response.status }
        );
      }

      const data = await response.json();
      // external API returns user info under data
      const res = NextResponse.json({ user: data.data });
      res.cookies.set("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 15,
        path: "/",
      });
      res.cookies.set("refreshToken", existingRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });
      return res;
    }
    // Handle successful initial fetch (status 200-299)
    else if (response.ok) {
      const data = await response.json();
      return NextResponse.json({ user: data.data });
    }
    // Handle other non-401 errors
    else {
      console.log("Failed to fetch user data: !response /me 00", response);
      return NextResponse.json(
        { detail: "Failed to fetch user data" },
        { status: response.status }
      );
    }
  } catch (error) {
    console.log(error, "error form route/me");
    const cookiesStore = await cookies();
    cookiesStore.delete("accessToken");
    cookiesStore.delete("refreshToken");

    const errorMessage =
      error instanceof Error ? error.message : "Session expired";

    return NextResponse.json({ detail: errorMessage }, { status: 401 });
  }
}

export async function PUT(request: Request) {
  const BASEURL = process.env.BASEURL;
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("accessToken")?.value;
  const data = await request.json();

  try {
    const response = await fetch(`${BASEURL}/users/me`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (!response.ok) {
      return NextResponse.json({ detail: "Failed to update user" });
    }
    const responseData = await response.json();
    return NextResponse.json({
      responseData,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to update user";
    return NextResponse.json({ detail: errorMessage }, { status: 500 });
  }
}
