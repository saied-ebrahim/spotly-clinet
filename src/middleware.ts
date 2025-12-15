import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decryptData } from "./shared/encryption";
import { DecryptedToken } from "./types/DecryptedToken";
import { parseJwt } from "./shared/jwt";

export default function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  // Extract locale from pathname
  const localeMatch = pathname.match(/^\/([a-z]{2})(\/|$)/);
  const locale = localeMatch ? localeMatch[1] : routing.defaultLocale;
  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(\/|$)/, "/");

  // Helper function to create localized path
  const getLocalizedPath = (path: string): string => {
    // If locale is default and localePrefix is 'as-needed', don't add locale
    if (locale === routing.defaultLocale && routing.localePrefix === "as-needed") {
      return path;
    }
    return `/${locale}${path}`;
  };

  let role: string | undefined;
  const token = request.cookies.get("sub");

  // Safely decrypt and parse token
  if (token?.value) {
    try {
      const tokenDecrypted = decryptData(token.value) as DecryptedToken;
      role = tokenDecrypted?.role;

      // If role not found in decrypted data, try to get it from JWT
      if (!role && tokenDecrypted?.token) {
        try {
          const decoded = parseJwt(tokenDecrypted.token);
          role = decoded?.role;
        } catch (error) {
          // Invalid JWT, continue without role
          console.error("Failed to parse JWT:", error);
        }
      }
    } catch (error) {
      // Invalid token, continue as guest
      console.error("Failed to decrypt token:", error);
    }
  }

  const isPublic =
    pathWithoutLocale === "/" ||
    pathWithoutLocale.startsWith("/events") ||
    pathWithoutLocale.startsWith("/auth");

  if (!token) {
    // Guest User
    if (!isPublic) {
      url.pathname = getLocalizedPath("/auth/login");
      return NextResponse.redirect(url);
    }
  } else {
    // Logged in User

    // Block /auth for all logged in users (except /auth/Profile)
    if (
      pathWithoutLocale.startsWith("/auth") &&
      !pathWithoutLocale.startsWith("/auth/Profile")
    ) {
      url.pathname = getLocalizedPath("/");
      return NextResponse.redirect(url);
    }

    // Role-based Access Control
    if (role === "user") {
      if (pathWithoutLocale.startsWith("/dashboard/admin")) {
        url.pathname = getLocalizedPath("/unauthorized");
        return NextResponse.redirect(url);
      }
    }
  }

  return createMiddleware(routing)(request);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
