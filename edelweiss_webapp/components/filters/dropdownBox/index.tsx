import { Dispatch, SetStateAction } from "react"

import { Datatype } from "@/types/filterDataType"
import styles from "./dropdownBox.module.css"

export function DropdownBox({
  data,
  action,
  state,
  ...restOfProps
}: {
  data: Datatype[]
  action: Dispatch<SetStateAction<string>>
  state: any
}) {
  return (
    <select
      {...restOfProps}
      value={state}
      onChange={(e) => action(e.target.value)}
    >
      {data.map(({ value, label, items }) => (
        <option key={label.replace(" ", "")} value={value}>
          {label}
          {/* {items && <span>{items}</span>} */}
        </option>
      ))}
    </select>
  )
}
