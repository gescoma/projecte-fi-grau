import { IconType } from "react-icons"

export type menuItem = {
  icon: IconType,
  text: string,
  link: string,
  submenu?: menuItem[]
}