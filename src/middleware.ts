import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { refreshAccessToken } from "@/lib/refreshAuth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const adminRoutes = ["/admin", "/settings"];
  const userRoutes = ["/dashboard", "/profile"];
  const instructorRoutes = ["/instructor/dashboard"];

  // Check if the route is protected
  if (
    [...adminRoutes, ...userRoutes, ...instructorRoutes].some((route) =>
      pathname.startsWith(route)
    )
  ) {
    try {
      // Initial attempt to get user data, forwarding original cookies
      const cookieHeader = request.headers.get('cookie') || '';
      let response = await fetch(`${request.nextUrl.origin}/api/me`, {
        headers: { cookie: cookieHeader },
      });

      // Handle 401 by attempting to refresh the token
      if (response.status === 401) {
        try {
          // Refresh the access token
          const { accessToken, refreshToken } = await refreshAccessToken();

          // Prepare response with updated cookies
          const nextResponse = NextResponse.next();
          nextResponse.cookies.set("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 15, // 15 minutes
            path: "/",
          });
          nextResponse.cookies.set("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: "/",
          });

          // Retry the /api/me request
          response = await fetch(`${request.nextUrl.origin}/api/me`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            credentials: "include",
          });

          if (!response.ok) {
            const cookieStore = await cookies();
            cookieStore.delete("accessToken");
            cookieStore.delete("refreshToken");
            return NextResponse.redirect(new URL("/auth/login", request.url));
          }

          // Proceed with the response
          const data = await response.json();
          const userRole = data?.user?.role || "user";

          // Role-based access control
          if (
            adminRoutes.some((route) => pathname.startsWith(route)) &&
            userRole !== "admin"
          ) {
            return NextResponse.redirect(new URL("/auth/login", request.url));
          }
          if (
            instructorRoutes.some((route) => pathname.startsWith(route)) &&
            userRole !== "instructor"
          ) {
            return NextResponse.redirect(new URL("/auth/login", request.url));
          }

          return nextResponse; // Proceed with updated cookies
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);
          // Clear cookies on refresh failure
          const cookieStore = await cookies();
          cookieStore.delete("accessToken");
          cookieStore.delete("refreshToken");
          return NextResponse.redirect(new URL("/auth/login", request.url));
        }
      }

      if (!response.ok) {
        // Clear cookies on non-401 failure
        console.log(
          "Failed to fetch user data: !response middleware",
          response
        );
        const cookieStore = await cookies();
        cookieStore.delete("accessToken");
        cookieStore.delete("refreshToken");
        return NextResponse.redirect(new URL("/auth/login", request.url));
      }

      // Parse response and validate
      const data = await response.json();
      if (!data?.user?.role) {
        const cookieStore = await cookies();
        cookieStore.delete("accessToken");
        cookieStore.delete("refreshToken");
        return NextResponse.redirect(new URL("/auth/login", request.url));
      }

      const userRole = data.user.role;

      // Role-based access control
      if (
        adminRoutes.some((route) => pathname.startsWith(route)) &&
        userRole !== "admin"
      ) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
      }
      if (
        instructorRoutes.some((route) => pathname.startsWith(route)) &&
        userRole !== "instructor"
      ) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
      }

      return NextResponse.next();
    } catch (error) {
      console.log("Middleware error 0:", error);
      // Clear cookies on error
      const cookieStore = await cookies();
      cookieStore.delete("accessToken");
      cookieStore.delete("refreshToken");
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/settings/:path*",
    "/dashboard/:path*",
    "/profile/:path*",
    "/instructor/dashboard/:path*",
  ],
};
