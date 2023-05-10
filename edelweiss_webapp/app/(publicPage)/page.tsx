"use client"

import { signOut, useSession } from "next-auth/react"
import { useEffect, useState } from "react"

import { Avatar } from "@/components/user/avatar"
import { Button } from "@/components/button"
import { Card } from "@/components/card"
import { Logo } from "@/components/logo"
import styles from "./page.module.css"
import { supabase } from "@/utils/supabaseClient"

export default function Home() {
  const { data: session } = useSession()
  const [campains, setCampains] = useState([])

  useEffect(() => {
    supabase
      .from("campain")
      .select("*")
      .then(({ error, data }) => {
        if (error) {
          throw error
        }
        const correctData = data.map(
          ({
            id,
            nombre,
            descripcion,
            fecha_inicio,
            fecha_fin,
            id_usuario,
          }) => ({
            id,
            nombre,
            descripcion,
            fecha_inicio,
            fecha_fin,
            id_usuario,
          })
        )
        setCampains(correctData)
      })
  }, [])

  return (
    <ul>
      {campains &&
        campains.map((campain: any) => {
          return <li key={campain.id}>{campain.nombre}</li>
        })}
    </ul>
  )
}
