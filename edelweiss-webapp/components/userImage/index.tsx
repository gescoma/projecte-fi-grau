"use client"

import Image from "next/image"
import styles from "./avatar.module.css"
import { useSession } from "next-auth/react"

export function UserImage({
  size = "normal",
}: {
  size?: "normal" | "small" | "large" | "xlarge"
}) {
  const avatarClassGenerator = `${styles.avatar} ${styles[size]}`
  const { data: session } = useSession()
  const alt = `Avatar image of ${session?.user?.name}`
  return (
    <div className={avatarClassGenerator}>
      {session?.user?.image && (
        <Image src={session?.user?.image} alt={alt} fill sizes="100%" />
      )}
    </div>
  )
}
