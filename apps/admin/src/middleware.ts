import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "./utils/supabase/middleware";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  const supabaseConfigured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);
  const response = await updateSession(request);
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY as string,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookies) {
          cookies.forEach(({ name, value, options }) => {
            response.cookies.set({ name, value, ...options });
          });
        },
      },
    }
  );

  const { data, error } = supabaseConfigured ? await supabase.auth.getUser() : { data: { user: null }, error: null } as any;
  const pathname = request.nextUrl.pathname;
  const isAuthRoute =
    pathname === '/login' ||
    pathname.startsWith('/login') ||
    pathname === '/otp' ||
    pathname.startsWith('/otp') ||
    pathname.startsWith('/auth');

  if (supabaseConfigured && (error || !data?.user) && !isAuthRoute) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.search = '';
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};


