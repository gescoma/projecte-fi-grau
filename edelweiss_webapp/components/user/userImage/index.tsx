import Image from "next/image"
import { Session } from "next-auth"
import { User } from "@/types/User"
import styles from "./avatar.module.css"

export function UserImage({
  user,
  size = "normal",
}: {
  user: Session["user"] | User
  size?: "normal" | "small" | "large" | "xlarge"
}) {
  const avatarClassGenerator = `${styles.avatar} ${styles[size]}`
  const alt = `Avatar image of ${user?.name}`
  return (
    <div className={avatarClassGenerator}>
      {user?.image && <Image src={user.image} alt={alt} fill sizes="100%" />}
    </div>
  )
}
