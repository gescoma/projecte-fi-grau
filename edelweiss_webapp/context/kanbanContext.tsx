"use client"

import { ReactNode, createContext, useCallback, useContext } from "react"

import { ColumnType } from "@/utils/kanban/enums"
import { useTaskCollection } from "@/hooks/useTasksCollection"

export const KanbanContext = createContext<any>({})

export const KanbanProvider = ({ children }: { children: ReactNode }) => {
  const kanban = useKanban()
  return (
    <KanbanContext.Provider value={kanban}>{children}</KanbanContext.Provider>
  )
}

export function useKanbanContext() {
  return useContext(KanbanContext)
}

function useKanban() {
  const { tasks, saveTask } = useTaskCollection()

  const addNewTask = useCallback(
    // Logica para añadir una nueva tarea en el dom de kanban
    (column: ColumnType) => {
      console.log(`Method to add new task to column ${column}`)

      const newTask = {
        id: "1",
        title: "New task",
        column: column,
        color: "#000000",
      }

      saveTask(newTask)
    },
    [saveTask]
  )

  const getColumnTasks = useCallback(
    (column: ColumnType) => {
      return tasks && tasks[column]
    },
    [tasks]
  )

  return {
    tasks,
    addNewTask,
    getColumnTasks,
  }
}
