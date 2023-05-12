"use client"

import { ReactNode, createContext, useCallback, useContext } from "react"

import { useClientsCollection } from "@/hooks/useClientsCollection"

export const ClientsContext = createContext<any>({})

export const ClientsProvider = ({ children }: { children: ReactNode }) => {
  const kanban = useKanban()
  return (
    <ClientsContext.Provider value={kanban}>{children}</ClientsContext.Provider>
  )
}

export function useClientsContext() {
  return useContext(ClientsContext)
}

function useKanban() {
  const { clients, formatedData, createClient } = useClientsCollection()

  // const addNewTask = useCallback(
  //   // Logica para añadir una nueva tarea en el dom de kanban
  //   (column: ColumnType) => {
  //     const newTask = {
  //       id: "1",
  //       title: "New task",
  //       column: column,
  //       color: "#000000",
  //     }

  //     saveTask(newTask)
  //   },
  //   [saveTask]
  // )

  // const getColumnTasks = useCallback(
  //   (column: ColumnType) => {
  //     return tasks && tasks[column]
  //   },
  //   [tasks]
  // )

  // const putTask = useCallback(
  //   (newTask: TaskModel, oldTask: TaskModel) => {
  //     updateTask(newTask, oldTask)
  //   },
  //   [updateTask]
  // )

  // const trashTask = useCallback(
  //   (task: any) => {
  //     deleteTask(task)
  //   },
  //   [deleteTask]
  // )

  // const getTaskWithId = useCallback(
  //   (id: TaskModel["id"], from: ColumnType) => {
  //     return tasks && tasks[from].filter((task: TaskModel) => task.id === id)[0]
  //   },
  //   [tasks]
  // )

  // const dropTaskFrom = useCallback(
  //   (from: ColumnType, id: TaskModel["id"], to: ColumnType) => {
  //     const task = getTaskWithId(id, from)
  //     if (task) {
  //       const newTask = structuredClone(task)
  //       newTask.column = to
  //       updateTask(newTask, task)
  //     }
  //   },
  //   [updateTask, getTaskWithId]
  // )

  return {
    clients,
    formatedData,
    createClient,
    // addNewTask,
    // getColumnTasks,
    // updateTask: putTask,
    // deleteTask: trashTask,
    // dropTaskFrom,
  }
}
