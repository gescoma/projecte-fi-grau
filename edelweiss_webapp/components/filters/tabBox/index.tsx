import { Dispatch, SetStateAction } from "react"

import { Datatype } from "@/types/filterDataType"
import styles from "./select.module.css"

export function TabBox({
  state,
  action,
  data,
}: {
  state: string
  action: Dispatch<SetStateAction<string>>
  data: Datatype[]
}) {
  return (
    <div>
      {data.map(({ label, value, items }) => (
        <button
          className={`${styles.button} ${value === state ? styles.active : ""}`}
          key={label}
          onClick={() => action(value)}
          disabled={value === state}
        >
          {label}
          {items && <span>{items}</span>}
        </button>
      ))}
    </div>
  )
}
