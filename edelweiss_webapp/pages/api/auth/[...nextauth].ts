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
        const res = await fetch(`${process.env.BACKEND_DOMAIN}/user/login/`, {
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
      }
    }),
    {
      id: "Edelweiss",
      name: "edelweiss",
      type: "oauth",
      token: `${process.env.BACKEND_DOMAIN}/token`,
      userinfo: `${process.env.BACKEND_DOMAIN}/user/me`,
      profile(profile) {
        console.log(profile)
        return {
          id: profile.uuid,
          name: profile.kakao_account?.profile.nickname,
          email: profile.kakao_account?.email,
          image: profile.kakao_account?.profile.profile_image_url,
        }
      },
    }
  ],
  pages: {
    signIn: "/auth/signIn"
  }
}

export default NextAuth(authOptions)