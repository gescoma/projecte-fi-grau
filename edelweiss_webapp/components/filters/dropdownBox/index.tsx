import { Dispatch, SetStateAction, useState } from "react"

import { Datatype } from "@/types/filterDataType"
import { FiChevronDown } from "react-icons/fi"
import { IconType } from "react-icons"
import { Select } from "@/components/input/selector"
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
  const handleClick = (value: string) => {
    action(value)
  }

  return (
    <>
      <div className={styles.select}>
        <span>Owners:</span>
        <Select
          defaultValue={
            data.filter((item) => item.value === state)[0].label as string
          }
          options={data.map((item) => ({
            label: item.label as string,
            value: item.value,
          }))}
          onChange={handleClick}
        />
      </div>
    </>
  )
}
