import styles from "./dashboard-head.module.css"

export function DashboardHead() {
  // const { t } = useTranslation("dashboard")

  return (
    <div className={styles.head}>
      <div className={styles.title}>
        <h1>{"title"}</h1>
      </div>
      <div className={styles.user}></div>
    </div>
  )
}
