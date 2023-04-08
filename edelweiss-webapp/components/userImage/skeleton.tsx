import styles from "./avatar.module.css"

export function UserImageSkeleton({
  size = "normal",
}: {
  size: "normal" | "small" | "large" | "xlarge"
}) {
  const avatarClassGenerator = `${styles.avatar} ${styles[size]} skeleton`
  return <div className={avatarClassGenerator}></div>
}
