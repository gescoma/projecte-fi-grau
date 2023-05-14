import { Select } from "."
import { useController } from "react-hook-form"

export function ControledSelect({
  defaultValue,
  options,
  ...props
}: {
  options: { label: string; value: string }[]
  defaultValue: string
  name: string
  control: any
}) {
  const {
    field: { value, onChange },
  } = useController(props)
  return (
    <Select
      defaultValue={defaultValue}
      options={options}
      onChange={onChange}
      size="big"
    />
  )
}
