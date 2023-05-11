import { FiFilter, FiTrash2, FiXCircle } from "react-icons/fi"

import styles from "./clearFiltersButton.module.css"

export function ClearFilters({ ...props }) {
  const { className, disabled, ...restOfProps } = props
  return (
    <div className={styles.container}>
      <button
        className={`${styles.button} ${className && className} ${
          !disabled && styles.active
        }`}
        disabled={disabled}
        {...restOfProps}
      >
        Limpiar filtros
        <div className={styles.iconGroup}>
          <FiFilter className={styles.icon} />
          <FiXCircle className={styles.iconSmall} />
        </div>
      </button>
    </div>
  )
}
