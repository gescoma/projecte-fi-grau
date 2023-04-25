import { Session } from "next-auth"
import { UserImage } from "@/components/user/userImage"
import { nextUser } from "@/types/nextUser"
import styles from "./avatar.module.css"

export function Avatar({
  user,
  size = "normal",
}: {
  user: Session["user"] | nextUser
  size?: "normal" | "small" | "large" | "xlarge"
}) {
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
      <UserImage size={size} user={user} />
      <div className={textClassGenerator}>
        <span className={nameClassGenerator}>{user?.name}</span>
        {(size === "xlarge" || size === "large") && <span>{user?.email}</span>}
      </div>
    </section>
  )
}
