import { NextResponse } from "next/server";
import {jwtDecode} from "jwt-decode";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;

  const protectedPaths = [
    "/main",
    "/settings",
    "/space",
    "/activity",
    "/dashboard",
    "/goals",
  ];

  const isProtected = protectedPaths.some((path) =>
    req.nextUrl.pathname === path || req.nextUrl.pathname.startsWith(path + "/")
  );

  if (isProtected) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      const decoded = jwtDecode(token);
      const isExpired = decoded.exp * 1000 < Date.now();

      if (isExpired) {
        const response = NextResponse.redirect(new URL("/login", req.url));
        response.cookies.delete("token");
        response.cookies.delete("userInfo");
        return response;
      }
    } catch {
      const response = NextResponse.redirect(new URL("/login", req.url));
      response.cookies.delete("token");
      response.cookies.delete("userInfo");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/main",
    "/main/:path*",
    "/settings",
    "/settings/:path*",
    "/space",
    "/space/:path*",
    "/activity",
    "/activity/:path*",
    "/dashboard",
    "/dashboard/:path*",
    "/goals",
    "/goals/:path*",
  ],
};
