import {
  FiBarChart2,
  FiBell,
  FiBook,
  FiBriefcase,
  FiGlobe,
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
    link: "/clients",
  },
  {
    icon: FiHome,
    text: "Viviendas",
    link: "/properties",
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
    link: "/campains",
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
      {
        text: "Gestion de entidades",
        link: "/entidades",
        icon: FiGlobe,
      },
    ],
  },
]
