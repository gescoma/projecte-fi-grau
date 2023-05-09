"use client"

import { ReactNode, createContext, useCallback, useContext } from "react"

import { ColumnType } from "@/utils/kanban/enums"
import { TaskModel } from "@/utils/kanban/models"
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
  const { tasks, saveTask, updateTask, deleteTask } = useTaskCollection()

  const addNewTask = useCallback(
    // Logica para añadir una nueva tarea en el dom de kanban
    (column: ColumnType) => {
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

  const putTask = useCallback(
    (newTask: TaskModel, oldTask: TaskModel) => {
      updateTask(newTask, oldTask)
    },
    [updateTask]
  )

  const trashTask = useCallback(
    (task: any) => {
      deleteTask(task)
    },
    [deleteTask]
  )

  const getTaskWithId = useCallback(
    (id: TaskModel["id"], from: ColumnType) => {
      return tasks && tasks[from].filter((task: TaskModel) => task.id === id)[0]
    },
    [tasks]
  )

  const dropTaskFrom = useCallback(
    (from: ColumnType, id: TaskModel["id"], to: ColumnType) => {
      const task = getTaskWithId(id, from)
      if (task) {
        const newTask = structuredClone(task)
        newTask.column = to
        updateTask(newTask, task)
      }
    },
    [updateTask, getTaskWithId]
  )

  return {
    tasks,
    addNewTask,
    getColumnTasks,
    updateTask: putTask,
    deleteTask: trashTask,
    dropTaskFrom,
  }
}
