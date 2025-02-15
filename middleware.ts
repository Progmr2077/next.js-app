import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const role = req.cookies.get('role')?.value;
    const acceptLanguage = req.headers.get('accept-language') || '';

    // Language Redirection
    if (pathname === '/home') {
        if (acceptLanguage.includes('fr')) {
            return NextResponse.redirect(new URL('/fr/home', req.url));
        }
        return NextResponse.redirect(new URL('/en/home', req.url));
    }

    // Admin Route Protection
    if (pathname.startsWith('/admin')) {
        if (role !== 'admin') {
            return NextResponse.redirect(new URL('/unauthorized', req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/home', '/admin/:path*'],
};