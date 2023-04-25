import { IconType } from "react-icons"
import Link from "next/link"
import styles from "./link.module.css"

export function MenuUserItem({
  icon: Icon,
  children,
  link,
  hasAction = false,
  action,
  className,
}: {
  icon?: IconType
  children: React.ReactNode
  link?: string
  hasAction?: boolean
  action?: () => void
  className?: string
}) {
  const handleClick = () => {
    if (!action) return
    action()
  }

  const itemContent = (
    <>
      {Icon && <Icon className={styles.icon} />}
      <span>{children}</span>
    </>
  )

  const buttonClassGenerator = `${styles.item} ${styles.button} ${
    hasAction ? styles.action : ""
  } ${className && styles[className]}`
  const linkClassGenerator = `${styles.item} ${styles.link} ${
    className && styles[className]
  }`

  return (
    <li className={styles.list}>
      {hasAction && action ? (
        <button className={buttonClassGenerator} onClick={handleClick}>
          {itemContent}
        </button>
      ) : link ? (
        <Link href={link} className={linkClassGenerator}>
          {itemContent}
        </Link>
      ) : (
        <span>Check menuUserItem props</span>
      )}
    </li>
  )
}
