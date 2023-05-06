"use client"

import { signOut, useSession } from "next-auth/react"

import { Avatar } from "@/components/user/avatar"
import { Button } from "@/components/button"
import { Card } from "@/components/card"
import { Logo } from "@/components/logo"
import styles from "./page.module.css"

export default function Home() {
  const { data: session } = useSession()

  if (session) {
    return (
      <div className={styles.main}>
        <Card>
          <Logo width={300} height={150} />
          <button onClick={() => signOut()}>Cerrar sesión</button>
        </Card>
      </div>
    )
  }
  return (
    <div className={styles.main}>
      <Card>
        <Logo width={300} height={150} />
        <Button>Enviar</Button>
        <Button color="blue">Enviar</Button>
      </Card>
    </div>
  )
}
