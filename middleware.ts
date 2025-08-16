import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const session = await auth();
  const url = req.nextUrl.clone();

  const blockedForLoggedIn = ["/signin", "/signup"];

  if (session?.user && blockedForLoggedIn.includes(url.pathname)) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/signin", "/signup"],
};
