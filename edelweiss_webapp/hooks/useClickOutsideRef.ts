"use client"

import { useEffect, useRef, useState } from "react";

export function useClickOutside<T>(hasAction=false, action:(() => void) | null = null) {
  const isOpenRef = useRef<T | any>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)
    useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !hasAction &&
        isOpen &&
        isOpenRef.current &&
        isOpenRef.current.contains &&
        !isOpenRef.current.contains(event.target as T)
      ) {
        setIsOpen(false)
      } else if (
        hasAction &&
        isOpenRef.current &&
        isOpenRef.current.contains &&
        !isOpenRef.current.contains(event.target as T)
      ) {
        action && action()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  })

  const handleClose = () => {
    setIsOpen(!isOpen)
  }

  return { isOpenRef, isOpen, handleClose }
}