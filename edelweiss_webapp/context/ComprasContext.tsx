"use client"

import { ReactNode, createContext, useContext } from "react"

import { useComprasCollection } from "@/hooks/useComprasCollection"

export const ComprasContext = createContext<any>({})

export const ComprasProvider = ({ children }: { children: ReactNode }) => {
  const compras = useComprasCollection()
  return (
    <ComprasContext.Provider value={compras}>
      {children}
    </ComprasContext.Provider>
  )
}

export function useComprasContext() {
  return useContext(ComprasContext)
}
