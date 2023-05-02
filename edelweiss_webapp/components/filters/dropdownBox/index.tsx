import { Datatype } from "@/types/filterDataType"
import styles from "./dropdownBox.module.css"

export function DropdownFilter({ data, ...restOfProps }: { data: Datatype[] }) {
  return (
    <select {...restOfProps}>
      {data.map(({ value, label, items }) => (
        <option key={label.replace(" ", "")} value={value}>
          {label}
          {items && <span>{items}</span>}
        </option>
      ))}
    </select>
  )
}
