"use client"

import { UserImage } from "@/components/userImage"
import styles from "./avatar.module.css"
import { useSession } from "next-auth/react"

export function Avatar({
  size = "normal",
}: {
  size?: "normal" | "small" | "large" | "xlarge"
}) {
  const { data: session } = useSession()
  const sizeClassCapitalize = size.charAt(0).toUpperCase() + size.slice(1)
  const avatarClassGenerator = `${styles.section} ${styles[size]}`
  const textClassGenerator = `${styles.userInfo} ${
    styles[`name${sizeClassCapitalize}`]
  }`
  const nameClassGenerator = `${styles.name} ${
    styles[`name${sizeClassCapitalize}`]
  }`
  return (
    <section className={avatarClassGenerator}>
      <UserImage size={size} />
      <div className={textClassGenerator}>
        <span className={nameClassGenerator}>{session?.user?.name}</span>
        {(size === "xlarge" || size === "large") && (
          <span>{session?.user?.email}</span>
        )}
      </div>
    </section>
  )
}
