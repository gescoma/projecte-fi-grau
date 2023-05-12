import { FiSearch } from "react-icons/fi"
import styles from "./search.module.css"

export function SearchBox({
  size = "normal",
  value,
  onChange,
  ...props
}: {
  size?: "filter" | "normal"
  value: string
  onChange: any
}) {
  return (
    <div className={`${styles.group} ${styles[size]}`}>
      <input
        type="text"
        value={value}
        placeholder="Buscar"
        onChange={(e) => onChange(e.target.value)}
        className={`${styles.input}`}
        {...props}
      />
      <FiSearch className={styles.icon} />
    </div>
  )
}
