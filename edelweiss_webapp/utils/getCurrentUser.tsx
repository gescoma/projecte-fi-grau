import { cookies } from "next/headers"
import { decode } from "next-auth/jwt"
import type { nextUser } from "@/types/nextUser"

function getCookie(): string | null {
  return cookies().get("next-auth.session-token")?.value || null
}

export async function getCurrentUser(): Promise<nextUser | null> {
  const sessionJWT = getCookie()
  if (!sessionJWT) return null
  const user = (await decode({
    token: sessionJWT,
    secret: process.env.NEXTAUTH_SECRET || "",
  })) as nextUser
  console.log({ user })
  return user
}

export function getUserToken(): Promise<string> {
  return getCurrentUser().then((user) => user?.client_id || "")
}
