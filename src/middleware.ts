import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decryptData } from "./shared/encryption";
import { DecryptedToken } from "./types/DecryptedToken";

import { parseJwt } from "./shared/jwt";

export default function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  const token = request.cookies.get("sub");
  const tokenDecrypted = decryptData(token?.value ?? "") as DecryptedToken;
  let role = tokenDecrypted?.role;

  if (!role && tokenDecrypted?.token) {
    const decoded = parseJwt(tokenDecrypted.token);
    role = decoded?.role;
  }

  const pathname = url.pathname;
  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(\/|$)/, "/");

  const isPublic =
    pathWithoutLocale === "/" ||
    pathWithoutLocale.startsWith("/events") ||
    pathWithoutLocale.startsWith("/auth");

  if (!token) {
    // Guest User
    if (!isPublic) {
      url.pathname = "/auth/login";
      return NextResponse.redirect(url);
    }
  } else {
    // Logged in User

    // Block /auth for all logged in users
    if (
      pathWithoutLocale.startsWith("/auth") &&
      !pathWithoutLocale.startsWith("/auth/Profile")
    ) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }

    // Role-based Access Control
    if (role === "user") {
      if (pathWithoutLocale.startsWith("/dashboard/admin")) {
        url.pathname = "/unauthorized";
        return NextResponse.redirect(url);
      }
    }
  }

  return createMiddleware(routing)(request);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};