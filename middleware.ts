import authConfig from "@/auth.config"
import NextAuth from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes"

const { auth } = NextAuth(authConfig)

export default auth(async function middleware(req: NextRequest & { auth?: any }) {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // If the user is logged in and trying to access an auth route, redirect them to the default login redirect

  if (isApiAuthRoute) {
    // return NextResponse.redirect(new URL(authRoutes[0], nextUrl));
    return NextResponse.next();
  }
  

  if(isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return NextResponse.next();
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    const callbackUrlInfo = `${authRoutes[0]}?callbackUrl=${encodedCallbackUrl}`;
    return NextResponse.redirect(new URL(callbackUrlInfo, nextUrl));
  }
  // return NextResponse.next()
})


export const config = {
  // This middleware will only run for the specified paths
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}