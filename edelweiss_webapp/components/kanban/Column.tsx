"use client"

import { ColumnType } from "@/utils/kanban/enums"
import { Task } from "./Task"
import { TaskModel } from "@/utils/kanban/models"
import styles from "./column.module.css"
import { useKanbanContext } from "@/context/kanbanContext"

export function Column({ column }: { column: ColumnType }) {
  const { getColumnTasks } = useKanbanContext()
  const ColumnTasks = getColumnTasks(column)

  const tasks = ColumnTasks
    ? ColumnTasks.map((task: TaskModel, index: number) => (
        <Task key={task.id} index={index} task={task} />
      ))
    : "No hay tares en esta columna"

  return (
    <article className={styles.column}>
      <header>
        <h1>{column}</h1>
        <button>+</button>
      </header>
      <section className={styles.tasks}>{tasks}</section>
    </article>
  )
}
