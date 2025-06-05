import { cookies } from "next/headers";
import { NextResponse } from "next/server";

let refreshPromise: Promise<{
  accessToken: string;
  refreshToken: string;
}> | null = null;

export async function refreshAccessToken() {
  if (refreshPromise) {
    return refreshPromise;
  }

  try {
    refreshPromise = (async () => {
      const cookieStore = await cookies();
      const refreshToken = cookieStore.get("refreshToken")?.value;

      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const BASEURL = process.env.BASEURL;
      if (!BASEURL) {
        throw new Error("BASEURL is not defined");
      }

      const response = await fetch(`${BASEURL}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to refresh token");
      }

      const data = await response.json();
      if (!data.access_token) {
        throw new Error("No access token returned");
      }

      cookieStore.set("accessToken", data.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 15,
      });

      return { accessToken: data.access_token, refreshToken };
    })();

    return await refreshPromise;
  } finally {
    refreshPromise = null;
  }
}

export async function authenticatedFetch(
  url: string,
  options: RequestInit = {}
) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!accessToken) {
    throw new Error("No access token available");
  }

  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${accessToken}`,
  };

  let response = await fetch(url, options);

  if (response.status === 401 && refreshToken) {
    try {
      const {
        accessToken: newAccessToken,
        refreshToken: existingRefreshToken,
      } = await refreshAccessToken();
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${newAccessToken}`,
      };
      response = await fetch(url, options);

      // Return response with updated cookies
      const nextResponse = NextResponse.json(await response.json(), {
        status: response.status,
      });
      nextResponse.cookies.set("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 15,
        path: "/",
      });
      nextResponse.cookies.set("refreshToken", existingRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });
      return nextResponse;
    } catch (refreshError) {
      const errorMessage =
        refreshError instanceof Error
          ? refreshError.message
          : "Authentication failed";
      console.warn("Error refreshing token:", errorMessage);
      throw new Error("Authentication failed");
    }
  }

  return response;
}
