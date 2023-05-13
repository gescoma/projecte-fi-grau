import { FiFilter, FiTrash2, FiXCircle } from "react-icons/fi"

import styles from "./clearFiltersButton.module.css"

export function FiltersButton({
  type = "normal",
  ...props
}: {
  type?: string
  disabled?: boolean
} & React.HTMLAttributes<HTMLButtonElement>) {
  const { className, disabled, children, ...restOfProps } = props
  return (
    <div className={styles.container}>
      <button
        className={`${styles.button} ${className && className} ${
          !disabled && styles.active
        } ${styles[type]}`}
        disabled={disabled}
        {...restOfProps}
      >
        {children}
      </button>
    </div>
  )
}
