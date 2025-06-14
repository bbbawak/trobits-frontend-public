/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get the pathname
  const pathname = request.nextUrl.pathname;

  // Handle trailing slashes consistently
  if (pathname !== '/' && pathname.endsWith('/')) {
    return NextResponse.redirect(
      new URL(pathname.slice(0, -1), request.url)
    );
  }

  // Allow all requests
  return NextResponse.next();
}

// Only run middleware on specific paths
export const config = {
  matcher: [
    // Only match dynamic routes that need trailing slash handling
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};
