import {
  FiBarChart2,
  FiBell,
  FiBook,
  FiBriefcase,
  FiGrid,
  FiHome,
  FiShoppingBag,
  FiSliders,
  FiUsers,
} from "react-icons/fi"

import type { menuItem } from "@/types/menuItem"

export const SidebarElements: menuItem[] = [
  {
    icon: FiBarChart2,
    text: "Dashboard",
    link: "/dashboard",
  },
  {
    icon: FiBook,
    text: "Clientes",
    link: "/profile",
  },
  {
    icon: FiHome,
    text: "Propiedades",
    link: "/profile",
  },
  {
    icon: FiShoppingBag,
    text: "Compras",
    link: "/profile",
  },
  {
    icon: FiBriefcase,
    text: "Proyectos",
    link: "/profile",
  },
  {
    icon: FiBell,
    text: "Campañas",
    link: "/clients",
  },
  {
    icon: FiSliders,
    text: "Gestion",
    link: "/manage",
    submenu: [
      {
        text: "Gestion de usuarios",
        link: "/users",
        icon: FiUsers,
      },
      {
        text: "Gestion de roles",
        link: "/roles",
        icon: FiGrid,
      },
    ],
  },
]
