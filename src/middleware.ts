import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decryptData } from "./shared/encryption";
import { DecryptedToken } from "./types/DecryptedToken";

export default function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  const token = request.cookies.get("token");
  const tokenDecrypted = decryptData(token?.value ?? "") as DecryptedToken;


  if (url.pathname.startsWith("/specialist")) {
    if (!token || tokenDecrypted?.kind !== "specialist") {
      url.pathname = "/unauthorized";
      return NextResponse.redirect(url);
    }
  }

  return createMiddleware(routing)(request);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
