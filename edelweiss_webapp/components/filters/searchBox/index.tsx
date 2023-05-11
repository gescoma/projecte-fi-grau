import { Dispatch, SetStateAction } from "react"

import { FiSearch } from "react-icons/fi"
import { SearchBox as Search } from "@/components/input/searchBox"
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
      <Search value={value} onChange={onChange} size="filter" />
    </div>
  )
}
