import styles from "./menuUser.module.css"

export interface MenuUserProps {
  children: React.ReactNode
  direction: "up" | "down"
}

export function MenuUser({ children, direction }: MenuUserProps) {
  const menuClassGenerator = `${styles.menu} ${styles[direction]}`

  return <ul className={menuClassGenerator}>{children}</ul>
}
