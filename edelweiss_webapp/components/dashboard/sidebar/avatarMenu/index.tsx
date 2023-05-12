"use client"

import {
  FiGrid,
  FiLogOut,
  FiMoreHorizontal,
  FiSettings,
  FiUser,
} from "react-icons/fi"

import { Avatar } from "@/components/user/avatar"
import { AvatarSkeleton } from "@/components/user/avatar/skeleton"
import { MenuUser } from "@/components/dashboard/sidebar/menuUser"
import { MenuUserItem } from "@/components/dashboard/sidebar/menuUserItem"
import { Separator } from "@/components/utils/separator"
import Swal from "sweetalert2"
import styles from "./avatar.module.css"
import { useClickOutside } from "@/hooks/useClickOutsideRef"
import { useSupabase } from "@/context/AuthContext"

export function AvatarMenu({
  className,
  menuDirection = "down",
}: {
  className?: string
  menuDirection?: "up" | "down"
}) {
  const { isOpen, isOpenRef, handleClose } = useClickOutside<HTMLDivElement>()
  const { profile, supabase } = useSupabase()

  const generateAvatarClass = `${styles.avatar} ${className}`

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
        supabase.auth.signOut()
        return
      }
      return
    })
  }

  return (
    <div ref={isOpenRef} className={generateAvatarClass}>
      {/* TODO: Print Avatar with user information */}
      {profile ? <Avatar user={profile} /> : <AvatarSkeleton />}
      <FiMoreHorizontal
        className={`${styles.icon} ${isOpen ? styles.active : ""}`}
        onClick={handleClose}
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
