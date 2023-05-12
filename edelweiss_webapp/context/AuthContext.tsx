"use client"

import type {
  Session,
  SupabaseClient,
  User,
} from "@supabase/auth-helpers-nextjs"
import { createContext, useContext, useEffect, useState } from "react"

import type { Database } from "@/types/database.types"
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"

type MaybeSession = Session | null

type SupabaseContext = {
  supabase: SupabaseClient<Database>
  session: MaybeSession
  user: User | null
  profile: any
}

const Context = createContext<SupabaseContext | undefined>(undefined)

export default function SupabaseProvider({
  children,
  session,
}: {
  children: React.ReactNode
  session: MaybeSession
}) {
  const [supabase] = useState(() => createBrowserSupabaseClient())
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState<any>(null)
  const router = useRouter()

  const handleProfile = async (user: User) => {
    setLoading(true)
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .filter("id", "eq", user.id)
      .single()
    if (error) throw new Error(error.message)
    const formatedData = {
      name: data.nombre,
      email: data.email,
      image: data.imagen,
    }
    setProfile(formatedData)
    setLoading(false)
  }

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        setProfile(null)
        setUser(null)
        router.push("/")
        return
      }
      console.log({ event, session })
      if (
        event === "INITIAL_SESSION" ||
        event === "USER_UPDATED" ||
        event === "SIGNED_IN"
      ) {
        setUser(session?.user ?? null)
        session &&
          session.user &&
          supabase
            .from("users")
            .select("*")
            .filter("id", "eq", session.user.id)
            .single()
            .then(({ data, error }) => {
              if (error) throw new Error(error.message)
              const formatedData = {
                name: data.nombre,
                email: data.email,
                image: data.imagen,
              }
              setProfile(formatedData)
            })
        return
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router, supabase])

  return (
    <Context.Provider value={{ supabase, session, user, profile }}>
      <>{children}</>
    </Context.Provider>
  )
}

export const useSupabase = () => {
  const context = useContext(Context)

  if (context === undefined) {
    throw new Error("useSupabase must be used inside SupabaseProvider")
  }

  return context
}
