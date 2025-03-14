// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const adminRoutes = ["/admin", "/settings"];
  const userRoutes = ["/dashboard", "/profile"];

  // Check if the route is protected
  if (
    [...adminRoutes, ...userRoutes].some((route) => pathname.startsWith(route))
  ) {
    try {
      // Get the role
      const response = await fetch(`${request.nextUrl.origin}/api/me`, {
        headers: {
          Cookie: request.headers.get("Cookie") || "",
        },
      });

      if (!response.ok) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
      }

      const { user } = await response.json();
      const userRole = user?.role || "user";

      // Admin route protection
      if (
        adminRoutes.some((route) => pathname.startsWith(route)) &&
        userRole !== "admin"
      ) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
      }
    } catch (error) {
      console.log(error, "error from middleware");
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  return NextResponse.next();
}

// 7. Apply to specific routes
export const config = {
  matcher: [
    "/admin/:path*",
    "/settings/:path*",
    "/dashboard/:path*",
    "/profile/:path*",

  ],
};
