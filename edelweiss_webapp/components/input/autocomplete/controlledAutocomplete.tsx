import { Autocomplete } from "./"
import { useController } from "react-hook-form"

export function ControledAutocomplete({
  defaultValue,
  options,
  ...props
}: {
  options: { label: string; value: string }[]
  defaultValue: { label: string; value: string }
  name: string
  control: any
}) {
  const {
    field: { onChange },
  } = useController(props)
  return (
    <Autocomplete
      defaultValue={defaultValue}
      options={options}
      action={onChange}
    />
  )
}
