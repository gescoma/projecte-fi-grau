"use client"

import { ReactNode, createContext, useContext } from "react"

import { usePropertiesCollection } from "@/hooks/usePropertiesCollection"

export const PropertiesContext = createContext<any>({})

export const PropertiesProvider = ({ children }: { children: ReactNode }) => {
  const properties = usePropertiesCollection()
  return (
    <PropertiesContext.Provider value={properties}>
      {children}
    </PropertiesContext.Provider>
  )
}

export function usePropertiesContext() {
  return useContext(PropertiesContext)
}
