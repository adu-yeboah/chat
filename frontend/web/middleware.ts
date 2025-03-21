// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value; 
  const { pathname } = req.nextUrl;

  const authPaths = ["/login", "register"]
  if (token && authPaths.includes(pathname)) {
    console.log("Authenticated user trying to access auth routes, redirecting to /");
    return NextResponse.redirect(new URL("/", req.url));
  }


  console.log(token)
  // If no token exists and the user tries to access protected routes, redirect to login
  const protectedPaths = ["/"];
  if (!token && protectedPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/register", req.url)); 
  }

  return NextResponse.next(); 
}

// Apply middleware to specific routes
export const config = {
  matcher: ["/auth/:path*", "/", "/user"], 
};
