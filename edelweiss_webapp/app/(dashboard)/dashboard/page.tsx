"use client"

import { Avatar } from "@/components/user/avatar"
import { AvatarMenu } from "@/components/dashboard/sidebar/avatarMenu"
import { useSupabase } from "@/context/AuthContext"

export default function DashboardPage() {
  const { supabase } = useSupabase()
  return (
    <>
      <h1>Dashboard</h1>
      <AvatarMenu />
      <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
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
