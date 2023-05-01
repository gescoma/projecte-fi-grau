import { Dispatch, SetStateAction } from "react"

import styles from "./select.module.css"

export function DisplaySelect({
  state,
  setState,
  options,
}: {
  state: string
  setState: Dispatch<SetStateAction<string>>
  options: { [key: string]: string }
}) {
  return (
    <div>
      {Object.entries(options).map(([key, value]) => (
        <button
          className={`${styles.button} ${value === state ? styles.active : ""}`}
          key={key}
          onClick={() => setState(value)}
          disabled={value === state}
        >
          {key}
        </button>
      ))}
    </div>
  )
}
