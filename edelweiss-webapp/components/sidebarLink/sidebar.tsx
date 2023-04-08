import { FiChevronRight } from "react-icons/fi"
import { IconType } from "react-icons"
import Link from "next/link"
import styles from "./link.module.css"
import { useState } from "react"

export function SidebarLink({
  icon: Icon,
  children,
  link,
  isActive = false,
  hasSubmenu = false,
  submenu = [],
}: {
  icon?: IconType
  children: React.ReactNode
  link: string
  isActive?: boolean
  hasSubmenu?: boolean
  submenu?: any
}) {
  const linkClassGenerator = `${styles.link} ${isActive ? styles.active : ""}`
  const caretClassGenerator = `${styles.caret} ${hasSubmenu ? styles.open : ""}`
  return (
    <li>
      <Link className={linkClassGenerator} href={link}>
        {Icon && <Icon />}
        <span>{children}</span>
        {hasSubmenu && <FiChevronRight className={caretClassGenerator} />}
      </Link>
    </li>
  )
}
