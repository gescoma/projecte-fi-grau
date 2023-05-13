import { ReactNode } from "react"
import styles from "./pill.module.css"

export function Pill({
  children,
  color = "#3498db",
  size = "normal",
}: {
  children: ReactNode
  color?: string
  size?: "big" | "small" | "normal" | ""
}) {
  return (
    <div
      className={`${styles.pill} ${styles[size]}`}
      style={{
        backgroundColor: `${color}33`,
        borderColor: `${color}aa`,
      }}
    >
      {children}
    </div>
  )
}
