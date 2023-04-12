"use client"

import {
  FiGrid,
  FiLogOut,
  FiMoreHorizontal,
  FiSettings,
  FiUser,
} from "react-icons/fi"
import { signOut, useSession } from "next-auth/react"
import { useEffect, useRef, useState } from "react"

import { Avatar } from "@/components/avatar"
import { AvatarSkeleton } from "@/components/avatar/skeleton"
import { MenuUser } from "@/components/menuUser"
import { MenuUserItem } from "@/components/menuUserItem"
import { Separator } from "@/components/separator"
import Swal from "sweetalert2"
import styles from "./avatar.module.css"

export function AvatarMenu({
  className,
  menuDirection = "down",
}: {
  className?: string
  menuDirection?: "up" | "down"
}) {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const generateAvatarClass = `${styles.avatar} ${className}`

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as HTMLDivElement)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  })

  const handleLogout = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Se cerrará la sesión actual",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--color-danger-50)",
      cancelButtonColor: "var(--color-black-50)",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        signOut()
        return
      }
      return
    })
  }

  return (
    <div ref={menuRef} className={generateAvatarClass}>
      {session?.user?.image ? <Avatar /> : <AvatarSkeleton />}
      <FiMoreHorizontal
        className={`${styles.icon} ${isOpen ? styles.active : ""}`}
        onClick={handleClick}
      />
      {isOpen && (
        <MenuUser direction={menuDirection}>
          <MenuUserItem link="user" icon={FiUser}>
            Your profile
          </MenuUserItem>
          <MenuUserItem link="settings" icon={FiSettings}>
            Configuration
          </MenuUserItem>
          <Separator />
          <MenuUserItem link="dashboard" icon={FiGrid}>
            Dashboard
          </MenuUserItem>
          <Separator />
          <MenuUserItem
            hasAction
            className="danger"
            action={handleLogout}
            icon={FiLogOut}
          >
            Cerrar sesión
          </MenuUserItem>
        </MenuUser>
      )}
    </div>
  )
}
