import Image from "next/image"
import { Session } from "next-auth"
import { User } from "@/types/User"
import styles from "./avatar.module.css"

export function UserImage({
  user,
  size = "normal",
}: {
  user: Session["user"] | User
  size?: "normal" | "small" | "large" | "xlarge" | "compressed"
}) {
  const avatarClassGenerator = `${styles.avatar} ${styles[size]}`
  const alt = `Avatar image of ${user?.name}`
  const imageSrc = user?.image || user?.picture
  return (
    <div className={avatarClassGenerator}>
      {user?.image && <Image src={imageSrc} alt={alt} fill sizes="100%" />}
    </div>
  )
}
