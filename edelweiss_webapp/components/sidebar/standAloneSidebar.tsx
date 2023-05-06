import { ReactNode } from "react"
import styles from "./sidebar.module.css"
import { useClickOutside } from "@/hooks/useClickOutsideRef"

export function SidebarLayout({ children }: { children: ReactNode }) {
  const { isOpenRef } = useClickOutside<HTMLDivElement>()

  return (
    <aside ref={isOpenRef} className={styles.sidebar}>
      <button>Close</button>
      {children}
    </aside>
  )
}
