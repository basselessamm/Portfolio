import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect all /admin routes except /admin/login
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const adminToken = request.cookies.get("portfolio_admin_token")?.value;
    const defaultPassword = process.env.ADMIN_PASSWORD || "admin123";
    const validToken = Buffer.from(`auth_${defaultPassword}_session_token_valid`).toString("base64");

    if (!adminToken || adminToken !== validToken) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
