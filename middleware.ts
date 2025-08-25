import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Public routes that logged-in users should not access
const PUBLIC_ROUTES = ["/signin", "/signup"];

// Routes that require authentication
const PROTECTED_ROUTES = ["/dashboard"];

// Middleware to handle authentication and route access
export async function middleware(req: NextRequest) {
  // Get the current session (user info)
  const session = await auth(); // Session | null
  const url = req.nextUrl.clone(); // Clone the URL to modify if needed

  // 1️⃣ Redirect logged-in users away from public routes
  if (
    session?.user &&
    PUBLIC_ROUTES.some((route) => url.pathname.startsWith(route))
  ) {
    url.pathname = "/"; // Redirect to home page
    return NextResponse.redirect(url);
  }

  // 2️⃣ Redirect non-logged-in users away from protected routes
  if (
    !session?.user &&
    PROTECTED_ROUTES.some((route) => url.pathname.startsWith(route))
  ) {
    url.pathname = "/signin"; // Redirect to sign-in page
    return NextResponse.redirect(url);
  }

  // 3️⃣ Allow request to continue if none of the conditions match
  return NextResponse.next();
}

// Configure which routes the middleware applies to
export const config = {
  matcher: [
    "/signin",
    "/signup",
    "/dashboard",
    "/dashboard/:path*", // Covers all sub-routes of /dashboard
  ],
};
