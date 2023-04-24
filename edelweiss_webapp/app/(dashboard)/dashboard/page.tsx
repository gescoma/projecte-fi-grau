"use client"

import { Avatar } from "@/components/avatar"
import { AvatarMenu } from "@/components/avatarMenu"
import { signOut } from "next-auth/react"

export default function DashboardPage() {
  return (
    <>
      <h1>Dashboard</h1>
      <AvatarMenu />
      <button onClick={() => signOut()}>Sign Out</button>
      <AvatarMenu />
      <Avatar
        user={{
          name: "Jose",
          image: "https://unavatar.io/random",
          email: "jose@edelweiss.com",
        }}
      />
    </>
  )
}
