import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_ROUTES = ['/'];

const PROTECTED_ROUTES = [''];

function matchRoute(pathname: string, routes: string[]) {
  return routes.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

export default function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isLoggedIn = Boolean(req.cookies.get('access_token'));

  const isPublic = matchRoute(pathname, PUBLIC_ROUTES);
  const isProtected = matchRoute(pathname, PROTECTED_ROUTES);

  // 1️⃣ Chưa login mà vào page cần login
  if (!isLoggedIn && isProtected) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // 2️⃣ Đã login mà vào login page (UX tốt hơn)
  if (isLoggedIn && pathname === '/login') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // 3️⃣ Public → cho đi
  if (isPublic) {
    return NextResponse.next();
  }

  // 4️⃣ Default
  return NextResponse.next();
}
