import { Dispatch, SetStateAction } from "react"

export function Search({
  setValue,
  value,
}: {
  setValue: Dispatch<SetStateAction<string>>
  value: string
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}
