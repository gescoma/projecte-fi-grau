import { Ref, useEffect, useRef, useState } from "react";

export function useClickOutside<T>() {
  const isOpenRef = useRef<T | any>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)
    useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        isOpenRef.current &&
        isOpenRef.current.contains &&
        !isOpenRef.current.contains(event.target as T)
      ) {
        setIsOpen(false)
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