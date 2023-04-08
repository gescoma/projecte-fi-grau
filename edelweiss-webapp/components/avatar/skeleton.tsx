import { UserImageSkeleton } from "@/components/userImage/skeleton"
import styles from "./avatar.module.css"

export function AvatarSkeleton({
  size = "normal",
}: {
  size?: "normal" | "small" | "large" | "xlarge"
}) {
  const avatarClassGenerator = `${styles.section} ${styles[size]}`
  const userInfoClassGenerator = `${styles.userInfo} ${styles[size]}`
  const emailClassGenerator = `${styles.email} ${styles[size]} skeleton`
  const nameClassGenerator = `${styles.userInfo} ${styles[size]} skeleton`
  return (
    <section className={avatarClassGenerator}>
      <UserImageSkeleton size={size} />
      <div className={userInfoClassGenerator}>
        <span className={nameClassGenerator} />
        {(size === "xlarge" || size === "large") && (
          <span className={emailClassGenerator} />
        )}
      </div>
    </section>
  )
}
