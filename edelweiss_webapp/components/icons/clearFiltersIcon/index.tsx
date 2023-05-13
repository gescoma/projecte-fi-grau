import { FiFilter, FiXCircle } from "react-icons/fi"

import styles from "./clearFiltersIcon.module.css"

export function ClearFiltersIcon() {
  return (
    <div className={styles.iconGroup}>
      <FiFilter className={styles.icon} />
      <FiXCircle className={styles.iconSmall} />
    </div>
  )
}
