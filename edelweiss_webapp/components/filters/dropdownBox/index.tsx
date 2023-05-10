import { Dispatch, SetStateAction, useState } from "react"

import { Datatype } from "@/types/filterDataType"
import styles from "./dropdown.module.css"

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
  const [selected, setSelected] = useState(state)
  const [selectOpen, setSelectOpen] = useState(false)
  return (
    <div className={styles.select}>
      {selected}
      {selectOpen && (
        <div className={styles.options}>
          {data.map(({ value, label, items }) => (
            <div key={value}>
              {typeof label === "string" ? label : label({})}
              {/* {items && <span>{items}</span>} */}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
