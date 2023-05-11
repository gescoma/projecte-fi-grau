import { Dispatch, SetStateAction } from "react"

import { FiSearch } from "react-icons/fi"
import styles from "./search.module.css"

export function SearchBox({
  onChange,
  value,
  ...props
}: {
  onChange: Dispatch<SetStateAction<string>>
  value: string
}) {
  return (
    <div className={styles.container}>
      <div className={styles.group}>
        <input
          type="text"
          value={value}
          placeholder="Buscar"
          onChange={(e) => onChange(e.target.value)}
          className={styles.input}
          {...props}
        />
        <FiSearch className={styles.icon} />
      </div>
    </div>
  )
}
