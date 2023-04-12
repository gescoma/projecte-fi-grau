import { FiGrid } from "react-icons/fi"
import type { menuItem } from "@/types/menuItem"

export const SidebarElements: menuItem[] = [
  {
    icon: FiGrid,
    text: "Dashboard",
    link: "/dashboard",
  },
  {
    icon: FiGrid,
    text: "Clientes",
    link: "/clients",
    submenu: [
      {
        icon: FiGrid,
        text: "Dashboard",
        link: "/dashboard",
      },
      {
        icon: FiGrid,
        text: "Dashboard",
        link: "/dashboard",
      },
      {
        icon: FiGrid,
        text: "Dashboard",
        link: "/dashboard",
      },
      {
        icon: FiGrid,
        text: "Dashboard",
        link: "/dashboard",
      },
    ],
  },
  {
    icon: FiGrid,
    text: "Perfil",
    link: "/profile",
  },
  {
    icon: FiGrid,
    text: "Perfil",
    link: "/profile",
  },
  {
    icon: FiGrid,
    text: "Perfil",
    link: "/profile",
  },
]
