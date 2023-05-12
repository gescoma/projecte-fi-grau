import { IconType } from "react-icons"

export type Datatype = {
  label: string | IconType
  value: string
  items?: number
  type?: string
  options?: string[]
}