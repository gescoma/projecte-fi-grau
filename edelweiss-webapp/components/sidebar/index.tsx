import { AvatarMenu } from "../avatarMenu"
import { FiGrid } from "react-icons/fi"
import { Logo } from "@/components/logo"
import { Separator } from "../separator"
import { SidebarMenu } from "@/components/sidebarMenu"
import styles from "./sidebar.module.css"

const SidebarElements = [
  {
    icon: FiGrid,
    children: "Dashboard",
    link: "/dashboard",
    isActive: true,
    hasSubmenu: true,
    submenu: [
      {
        icon: FiGrid,
        children: "Dashboard",
        link: "/dashboard",
        isActive: true,
      },
      {
        icon: FiGrid,
        children: "Dashboard",
        link: "/dashboard",
        isActive: false,
      },
      {
        icon: FiGrid,
        children: "Dashboard",
        link: "/dashboard",
        isActive: false,
      },
      {
        icon: FiGrid,
        children: "Dashboard",
        link: "/dashboard",
        isActive: false,
      },
    ],
  },
  {
    icon: FiGrid,
    children: "Perfil",
    link: "/profile",
    isActive: false,
  },
  {
    icon: FiGrid,
    children: "Perfil",
    link: "/profile",
    isActive: false,
  },
  {
    icon: FiGrid,
    children: "Perfil",
    link: "/profile",
    isActive: false,
  },
  {
    icon: FiGrid,
    children: "Perfil",
    link: "/profile",
    isActive: false,
  },
]

export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <Logo width={180} height={48} className={styles.logo} />
      <SidebarMenu elements={SidebarElements} />
      <Separator width={70} weight={3} />
      <AvatarMenu className={styles.avatar} menuDirection="up" />
    </aside>
  )
}
