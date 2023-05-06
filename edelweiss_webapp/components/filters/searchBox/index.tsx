import { Dispatch, SetStateAction } from "react"

export function SearchBox({
  onChange,
  value,
  ...props
}: {
  onChange: Dispatch<SetStateAction<string>>
  value: string
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      {...props}
    />
  )
}
