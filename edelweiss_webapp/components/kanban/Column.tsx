"use client"

import { Task } from "./Task"
import { TaskModel } from "@/utils/kanban/models"
import styles from "./column.module.css"
import { useColumnDrop } from "@/hooks/useColumnDrop"
import { useComprasContext } from "@/context/ComprasContext"
import { ComponentType } from "react"
import { Sidebar as DefaultSidebar } from "./sidebar"

export function Column({
  column,
  sidebar: Sidebar = DefaultSidebar,
}: {
  column: {
    id: string
    title: string
  }
  sidebar?: ComponentType<any>
}) {
  const { tasks: AllTasks, dropTaskFrom } = useComprasContext()
  const column_id = column.id
  const ColumnTasks = (AllTasks && AllTasks[column_id]) || []

  const { dropRef, isOver } = useColumnDrop(column.id, dropTaskFrom)

  const tasks =
    ColumnTasks && ColumnTasks.length > 0
      ? ColumnTasks.map((task: TaskModel, index: number) => (
          <Task sidebar={Sidebar} key={task.id} index={index} task={task} />
        ))
      : "No hay tares en esta columna"

  return (
    <article className={styles.column}>
      <header>
        <h3>{column.title}</h3>
      </header>
      <section className={styles.tasks} ref={dropRef}>
        {tasks}
      </section>
    </article>
  )
}
