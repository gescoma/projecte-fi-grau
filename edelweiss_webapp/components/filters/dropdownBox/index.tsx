import { Dispatch, ReactNode, SetStateAction, useCallback } from "react"

import { Select } from "@/components/input/selector"
import styles from "./dropdown.module.css"

export function DropdownBox({
  data,
  action,
  state,
  children,
}: {
  data: any
  action: Dispatch<SetStateAction<string>>
  state: any
  children?: ReactNode
}) {
  const handleClick = (value: string) => {
    action(value)
  }

  const getActualValue = useCallback(
    (value: string) => {
      const actualValue = data.filter(
        ({ name }: { name: string }) => name === value
      )
      if (actualValue[0]) {
        return actualValue[0].id
      }
      return "Todos"
    },
    [data]
  )

  return (
    <>
      <div className={styles.select}>
        {children && <span>{children}</span>}
        {data && (
          <Select
            defaultValue={getActualValue(state)}
            options={data.map(({ name, id }: { name: string; id: string }) => ({
              label: name,
              value: id,
            }))}
            onChange={handleClick}
          />
        )}
      </div>
    </>
  )
}
