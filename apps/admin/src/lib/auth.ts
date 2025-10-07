import { createClient } from "../utils/supabase/server";
import { jwtDecode } from "jwt-decode";

type AppRole = "admin" | "super_admin";
type JWTPayload = { user_role?: AppRole; [k: string]: unknown };

export async function requireUser() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) return { user: null, role: null as AppRole | null };
  const { data: sessionData } = await supabase.auth.getSession();
  const token = sessionData?.session?.access_token;
  const role = token ? (jwtDecode<JWTPayload>(token).user_role ?? null) : null;
  return { user: data.user, role } as const;
}

export async function assertRole(roles: AppRole[]) {
  const { user, role } = await requireUser();
  if (!user || !role || !roles.includes(role)) return { ok: false as const, role };
  return { ok: true as const, role };
}


