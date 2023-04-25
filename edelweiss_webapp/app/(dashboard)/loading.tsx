import { DashboardHead } from "@/components/dashboard/dashboard-head"
import { SidebarLoading } from "@/components/sidebar/sidebarLoading"
import styles from "./layout.module.css"

export default function DashboardsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={styles.container}>
      <SidebarLoading />
      <main className={styles.main}>
        <DashboardHead />
        {children}
      </main>
    </div>
  )
}
