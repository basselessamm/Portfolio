import { cookies } from "next/headers";

const ADMIN_COOKIE_NAME = "portfolio_admin_token";
const DEFAULT_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

// Simple signature generator for session token
function generateToken(password: string): string {
  return Buffer.from(`auth_${password}_session_token_valid`).toString("base64");
}

export function verifyAdminPassword(inputPassword: string): boolean {
  return inputPassword === DEFAULT_PASSWORD;
}

export async function createAdminSession() {
  const token = generateToken(DEFAULT_PASSWORD);
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) return false;
  return token === generateToken(DEFAULT_PASSWORD);
}
