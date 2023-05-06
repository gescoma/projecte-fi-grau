import styles from "./sidebar.module.css"
import { useClickOutside } from "@/hooks/useClickOutsideRef"

export function SidebarLayout({
  children,
  closeAction,
}: {
  children: any
  closeAction: () => void
}) {
  const { isOpenRef } = useClickOutside<HTMLDivElement>(true, closeAction)

  return (
    <aside ref={isOpenRef} className={styles.sidebar}>
      <button onClick={closeAction}>Close</button>
      {children}
    </aside>
  )
}
