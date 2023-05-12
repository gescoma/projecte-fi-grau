import { cookies, headers } from "next/headers"


import type { Database } from "@/types/database.types"
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs"
import styles from "./page.module.css"
import { useCalendarEvents } from "@/hooks/useCalendarEvents"

export const revalidate = 0

export default async function Home() {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  })

  const { data } = await supabase.from("campain").select("*")

  return (
    <ul>
      {data &&
        data.map((campain) => {
          return <li key={campain.id}>{campain.nombre}</li>
        })}
    </ul>
  )
}
