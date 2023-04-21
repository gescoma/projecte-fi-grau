"use client"

import { AvatarMenu } from "@/components/avatarMenu"
import { signOut } from "next-auth/react"

export default function DashboardPage() {
  return (
    <>
      <h1>Dashboard</h1>
      <AvatarMenu />
      <button onClick={() => signOut()}>Sign Out</button>
      <AvatarMenu />
    </>
  )
}
