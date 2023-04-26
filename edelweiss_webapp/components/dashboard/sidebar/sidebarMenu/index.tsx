"use client"

import { SidebarElements } from "@/utils/navbarMenuItems"
import { SidebarLink } from "@/components/dashboard/sidebar/sidebarLink"
import type { menuItem } from "@/types/menuItem"
import styles from "./menu.module.css"
import { usePathname } from "next/navigation"

export function SidebarMenu() {
  const pathname = usePathname()

  return (
    <nav className={styles.navigation}>
      <ul className={styles.list}>
        {SidebarElements.map((element: menuItem, index: number) => (
          <SidebarLink
            key={index}
            link={element.link}
            icon={element.icon}
            isActive={element.link === `/${pathname?.split("/")[1]}`}
            submenu={element.submenu ?? []}
          >
            {element.text}
          </SidebarLink>
        ))}
      </ul>
    </nav>
  )
}
