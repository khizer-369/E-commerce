import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export const proxy = async (req) => {
    const { pathname } = req.nextUrl;
    const publicRoutes = ["/sign-up", "/sign-in", "/api/auth", "/api/sign-up", "/api/favorite-products", "/api/all-products", "/api/stripe"];

    if (publicRoutes.some((path) => pathname.startsWith(path)) || pathname === "/") {
        return NextResponse.next();
    }
    const token = await getToken({ req, secret: process.env.NEXT_AUTH_SECRET });
    if (!token) {
        const signInUrl = new URL("/sign-in", req.url);
        signInUrl.searchParams.set("callbackUrl", req.url);
        return NextResponse.redirect(signInUrl);
    }

    if ((pathname.startsWith("/admin") && token.role !== "admin") || (pathname.startsWith("/api/admin") && token.role !== "admin")) {
        const signInUrl = new URL("/sign-in", req.url);
        signInUrl.searchParams.set("callbackUrl", req.url);
        return NextResponse.redirect(signInUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
}