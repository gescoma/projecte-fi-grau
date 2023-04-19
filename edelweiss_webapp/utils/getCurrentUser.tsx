import { cookies } from "next/headers"
import { decode } from "next-auth/jwt"
import type { nextUser } from "@/types/nextUser"

export async function getCurrentUser(): Promise<nextUser | null> {
  const sessionJWT = cookies().get("next-auth.session-token")?.value || null
  if (!sessionJWT) return null
  const user = (await decode({
    token: sessionJWT,
    secret: process.env.NEXTAUTH_SECRET || "",
  })) as nextUser
  return user
}

export function getUserToken(): string {
  const cookieStorage = cookies()
  return cookieStorage.get("next-auth.session-token")?.value || ""
}
