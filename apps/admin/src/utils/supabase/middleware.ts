import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function updateSession(request: NextRequest) {
  // If Supabase env is not configured, skip auth refresh to avoid crashes
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) {
    return NextResponse.next();
  }
  const response = NextResponse.next();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY as string,
    {
      cookies: {
        get: (key) => request.cookies.get(key)?.value,
        set: (key, value, options) => {
          response.cookies.set({ name: key, value, ...options });
        },
        remove: (key, options) => {
          response.cookies.set({ name: key, value: "", ...options });
        },
      },
    }
  );
  await supabase.auth.getUser();
  return response;
}


