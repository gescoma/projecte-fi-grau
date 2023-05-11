import { Dispatch, SetStateAction, useState } from "react"

import { Datatype } from "@/types/filterDataType"
import { FiChevronDown } from "react-icons/fi"
import { IconType } from "react-icons"
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
  const [selected, setSelected] = useState<string | IconType>(
    data.filter((item) => item.value === state)[0].label as string | IconType
  )
  const [selectOpen, setSelectOpen] = useState(false)

  console.log({ state })

  const handleClick = (value: string, label: string | IconType) => {
    setSelected(label)
    action(value)
    setSelectOpen(false)
  }

  console.log({ selected, selectOpen })
  return (
    <>
      <div className={styles.select}>
        <span>Owners:</span>
        <div
          className={`${styles.input} ${selectOpen && styles.open}`}
          onClick={() => setSelectOpen(!selectOpen)}
        >
          <div className={styles.label}>
            {typeof selected === "string" ? selected : selected({})}
            <FiChevronDown
              className={`${styles.caret} ${selectOpen && styles.turnCaret}`}
            />
          </div>
        </div>
        {selectOpen && (
          <div className={styles.optionsContainer}>
            <div className={styles.options}>
              {data.map(({ value, label, items }) => (
                <div
                  className={styles.value}
                  key={value}
                  onClick={() => handleClick(value, label)}
                >
                  {typeof label === "string" ? label : label({})}
                  {/* {items && <span>{items}</span>} */}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
