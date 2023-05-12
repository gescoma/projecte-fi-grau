import "./globals.css"

import type { Session } from "@supabase/auth-helpers-nextjs"
import SupabaseProvider from "@/context/AuthContext"

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode
  session: Session
}) {
  return (
    <html lang="en">
      <body>
        <SupabaseProvider session={session}>{children}</SupabaseProvider>
      </body>
    </html>
  )
}
