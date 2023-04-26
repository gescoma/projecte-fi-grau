import "./globals.css"

import AuthContext from "@/context/AuthContext"
import { Session } from "next-auth"
import { headers } from "next/headers"

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

async function getSession(cookie: string): Promise<Session> {
  const res = await fetch(`${process.env.CURRENT_DOMAIN}/api/auth/session`, {
    headers: {
      cookie,
    },
  })
  const session = await res.json()
  return Object.keys(session).length > 0 ? session : null
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession(headers().get("cookie") ?? "")
  return (
    <AuthContext session={session}>
      <html lang="en">
        <body>{children}</body>
      </html>
    </AuthContext>
  )
}