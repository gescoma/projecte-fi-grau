import * as Icons from "react-icons/fi/"

import { Dispatch, SetStateAction } from "react"

import { IconType } from "react-icons"
import styles from "./select.module.css"

const IconComponent = ({
  type,
  ...props
}: {
  type: any
  className?: string
}) => {
  // @ts-ignore
  const TheIcon = Icons[type] as IconType
  return <TheIcon {...props} />
}

export function TabBox({
  state,
  action,
  data,
}: {
  state: string
  action: Dispatch<SetStateAction<string>>
  data: any
}) {
  return (
    <div className={styles.container}>
      {data.map(
        ({
          nombre,
          codigo,
          icon,
        }: {
          nombre: string
          codigo: string
          icon: string
        }) => (
          <button
            className={`${styles.button} ${
              codigo === state ? styles.active : ""
            }`}
            key={codigo}
            onClick={() => action(codigo)}
            disabled={codigo === state}
          >
            {icon ? (
              <IconComponent type={icon} className={styles.icon} />
            ) : (
              nombre
            )}
          </button>
        )
      )}
    </div>
  )
}
