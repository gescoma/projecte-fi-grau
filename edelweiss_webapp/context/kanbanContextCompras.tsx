"use client"

import { ReactNode, createContext, useCallback, useContext } from "react"

import { ColumnType } from "@/utils/kanban/enums"
import { TaskModel } from "@/utils/kanban/models"
import { useComprasCollection } from "@/hooks/useComprasCollection"
import { useTaskCollection } from "@/hooks/useTasksCollection"

export const KanbanContext = createContext<any>({})

export const KanbanProvider = ({ children }: { children: ReactNode }) => {
  const kanban = useKanban()
  return (
    <KanbanContext.Provider value={kanban}>{children}</KanbanContext.Provider>
  )
}

export function useKanbanComprasContext() {
  return useContext(KanbanContext)
}

function useKanban() {
  const collection = useComprasCollection()

  return collection
}
