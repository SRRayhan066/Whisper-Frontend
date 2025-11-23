import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("refreshToken")?.value;

  const isAuthenticated = !!token;

  if (pathname === "/" && isAuthenticated) {
    return NextResponse.redirect(new URL("/chat", request.url));
  }

  if (pathname.startsWith("/chat") && !isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/chat", "/chat/:path*"],
};
