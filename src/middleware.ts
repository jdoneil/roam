import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const isApiRoute = req.nextUrl.pathname.startsWith("/api/generate");

  if (isApiRoute) {
    const auth = req.cookies.get("roam_auth")?.value;
    if (auth !== process.env.SITE_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/generate"],
};
