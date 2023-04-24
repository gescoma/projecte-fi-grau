"use client"

import { FiChevronRight } from "react-icons/fi"
import { IconType } from "react-icons"
import Link from "next/link"
import { menuItem } from "@/types/menuItem"
import styles from "./link.module.css"
import { useState } from "react"

export function SidebarLink({
  icon: Icon,
  children,
  link,
  isActive = false,
  submenu = [],
}: {
  icon?: IconType
  children: React.ReactNode
  link: string
  isActive?: boolean
  submenu?: any
}) {
  const [open, setOpen] = useState(false)
  const linkClassGenerator = `${styles.link} ${isActive ? styles.active : ""} ${
    open ? styles.focus : ""
  }`
  const caretClassGenerator = `${styles.caret} ${open ? styles.open : ""}`

  const hasSubmenu = submenu.length > 0

  return (
    <li>
      {!hasSubmenu ? (
        <Link className={linkClassGenerator} href={link}>
          {Icon && <Icon />}
          {children}
        </Link>
      ) : (
        <>
          <button className={linkClassGenerator} onClick={() => setOpen(!open)}>
            {Icon && <Icon />}
            {children}
            <FiChevronRight className={caretClassGenerator} />
          </button>
          {open && (
            <ul className={styles.submenuContainer}>
              {submenu.map(
                ({ icon: SubmenuIcon, ...item }: menuItem, index: number) => (
                  <li key={index}>
                    <Link
                      className={styles.submenu}
                      href={`${link}${item.link}`}
                    >
                      {Icon && <SubmenuIcon />}
                      {item.text}
                    </Link>
                  </li>
                )
              )}
            </ul>
          )}
        </>
      )}
    </li>
  )
}
