// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("mkey")?.value; // Check for the token in cookies
  const { pathname } = req.nextUrl;

  // If token exists and the user tries to access /auth routes, redirect to home
  if (token && pathname.startsWith("/auth")) {
    console.log("Authenticated user trying to access auth routes, redirecting to /");
    return NextResponse.redirect(new URL("/", req.url));
  }


  console.log(token)
  // If no token exists and the user tries to access protected routes, redirect to login
  const protectedPaths = ["/"];
  if (!token && protectedPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", req.url)); // Adjust login path if needed
  }

  return NextResponse.next(); // Allow the request to proceed
}

// Apply middleware to specific routes
export const config = {
  matcher: ["/auth/:path*", "/", "/user"], // Match all auth routes, home, and user routes
};
