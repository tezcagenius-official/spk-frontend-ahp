import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const tokenSession = (await cookies()).get("token")?.value ?? null;

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  if ((!tokenSession || tokenSession === "") && pathname !== "/login")
    return NextResponse.redirect(new URL("/login", request.url));

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!login|forget-password|api|_next/static|_next/image|favicon.ico|img|icons|svg|images).*)",
  ],
};
