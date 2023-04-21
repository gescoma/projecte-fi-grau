import { Sidebar } from "@/components/sidebar"
import styles from "./layout.module.css"

export default function DashboardsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={styles.container}>
      <Sidebar />
      <main className={styles.main}>{children}</main>
    </div>
  )
}
