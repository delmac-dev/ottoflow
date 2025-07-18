import NextAuth from "next-auth"
import authConfig from "./auth.config"
 import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const url = req.nextUrl.clone();

    if(req.auth &&  url.pathname === "/auth") {
        return NextResponse.redirect(new URL("/", req.url));
    }
    
    if (!req.auth && url.pathname !== "/auth") {
        let { href } = url;
        href = encodeURIComponent(href);
        return NextResponse.redirect(new URL(`/auth?redirect=${href}`, req.url));
    }

    return NextResponse.next();
});



export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$|favicon\\.ico$|manifest\\.json$).*)']
}