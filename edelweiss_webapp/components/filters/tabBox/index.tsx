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
    <div className={styles.container}>
      {data.map(({ label, value, items }) => (
        <button
          className={`${styles.button} ${value === state ? styles.active : ""}`}
          key={value}
          onClick={() => action(value)}
          disabled={value === state}
        >
          {typeof label === "string"
            ? label
            : label({
                className: styles.icon,
              })}
        </button>
      ))}
    </div>
  )
}
