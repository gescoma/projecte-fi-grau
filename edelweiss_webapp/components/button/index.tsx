import { ReactNode } from "react"
import styles from "./button.module.css"

export function Button({
  children,
  disabled = false,
  color = "white",
  label = "",
}: {
  children: ReactNode
  disabled?: boolean
  color?: "red" | "blue" | "green" | "yellow" | "white" | "black"
  label?: string
}) {
  return (
    <button className={`${styles.button} ${styles[color]}`} disabled={disabled}>
      <span>{label}</span>
      {children}
    </button>
  )
}
