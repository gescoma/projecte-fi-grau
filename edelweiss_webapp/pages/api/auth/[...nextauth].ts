import NextAuth, { Account, AuthOptions, DefaultSession, Profile, Session, User } from "next-auth"

import { AdapterUser } from "next-auth/adapters"
import CredentialsProvider from "next-auth/providers/credentials"
import { JWT } from "next-auth/jwt"

export const authOptions:AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: Record<"email" | "password", string> | undefined, req:any) {
        const res = await fetch(`${process.env.BACKEND_DOMAIN}/auth/login/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            bearer: process.env.BACKEND_BEARER,
            ...credentials
          })
        })
        const user = await res.json()
        if (user.detail) {
          throw new Error(user.detail)
        }
        return user
      },
    })
  ],
  pages: {
    signIn: "/auth/signin"
  },
  callbacks: {
    async jwt ({
      token,
      user
    }) {
      if(user?.client_id) token.client_id = user.client_id
      if(user?.role) token.role = user.role
      return token
    },
  
    async session({session, token}): Promise<Session | DefaultSession> {
      if(session?.user && token.role) {
        session.user.role = token.role;
        session.user.client_id = token.client_id
      }
      return session
    }
  }
}

export default NextAuth(authOptions)