import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export async function middleware(req) {
    // Token exists if logged in.
    const token = await getToken({ req, secret: process.env.JWT_SECRET })

    const { pathname } = req.nextUrl
    const loginRedirect = req.nextUrl.clone()
    loginRedirect.pathname = '/login'

    // Allow requests if following is true.
    // 1. Its a request for next-auth session
    // 2. The Token exists
    if(pathname.includes('api/auth') || token ){
        return NextResponse.next()
    }

    if (!token && pathname !== '/login') {
        return NextResponse.redirect(loginRedirect)
    }
        
}