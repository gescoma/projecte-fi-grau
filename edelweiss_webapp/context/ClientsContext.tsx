"use client"

import { ReactNode, createContext, useCallback, useContext } from "react"

import { useClientsCollection } from "@/hooks/useClientsCollection"

export const ClientsContext = createContext<any>({})

export const ClientsProvider = ({ children }: { children: ReactNode }) => {
  const clients = useClientsCollection()
  return (
    <ClientsContext.Provider value={clients}>
      {children}
    </ClientsContext.Provider>
  )
}

export function useClientsContext() {
  return useContext(ClientsContext)
}
