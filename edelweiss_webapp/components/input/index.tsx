import { RegisterOptions, UseFormRegister } from "react-hook-form"

import styles from "./input.module.css"

export function Input({
  placeholder = "Insert placeholder to Input component",
  type = "text",
  icon = false,
  iconPosition = "end",
  register,
  name,
  options = {},
  size = "normal",
  ...restOfProps
}: {
  placeholder?: string
  type?: string
  icon?: boolean
  iconPosition?: "end" | "begin"
  register: UseFormRegister<any>
  name: string
  size?: "normal" | "small" | "full" | "half"
  options?: RegisterOptions
}) {
  const inputClassGenerator = `${styles.input} ${styles[size]}`

  return (
    <input
      className={inputClassGenerator}
      type={type}
      placeholder={placeholder}
      {...register(name, options)}
      {...restOfProps}
    />
  )
}
