import NextAuth, { AuthOptions } from "next-auth"

import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions:AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: Record<"email" | "password", string> | undefined, req:any) { 
        const res = await fetch(`${process.env.BACKEND_DOMAIN}/user/login`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" }
        })
        const user = await res.json()
        if (res.ok && user) {
          return user
        }
        return null
      }
    })
  ],
  pages: {
    signIn: "/auth/signIn"
  }
}

export default NextAuth(authOptions)