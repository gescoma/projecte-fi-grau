import Image from "next/image"
import { User } from "@/types/User"
import styles from "./avatar.module.css"

export function UserImage({
  user,
  size = "normal",
}: {
  user: any
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
