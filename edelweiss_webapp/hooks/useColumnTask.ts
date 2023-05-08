"use client"

import { ColumnType } from "@/utils/kanban/enums";
import { useCallback } from "react";
import { useTaskCollection } from "./useTasksCollection";

const MAX_TASKS = 100

export function useColumnTask(column: ColumnType) {
  const {tasks, saveTask} = useTaskCollection()

  const addNewTask = useCallback(() => {
    console.log(`Method to add new task to column ${column}`)

    const newTask = {
      id: "1",
      title: "New task",
      column: column,
      color: "#000000"
    }

    saveTask(newTask)

  }, [column, saveTask])

  return {tasks: tasks?.[column], addNewTask}
} 