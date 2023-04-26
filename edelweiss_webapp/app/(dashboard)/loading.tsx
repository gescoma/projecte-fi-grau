import { SidebarLoading } from "@/components/dashboard/sidebar/sidebarLoading"
import styles from "./layout.module.css"

export default function DashboardsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={styles.container}>
      <SidebarLoading />
      <main className={styles.main}>{children}</main>
    </div>
  )
}
