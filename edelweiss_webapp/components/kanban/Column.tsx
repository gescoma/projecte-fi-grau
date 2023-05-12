"use client"

import { ColumnType } from "@/utils/kanban/enums"
import { Task } from "./Task"
import { TaskModel } from "@/utils/kanban/models"
import styles from "./column.module.css"
import { useColumnDrop } from "@/hooks/useColumnDrop"
import { useKanbanContext } from "@/context/kanbanContext"

export function Column({ column }: { column: ColumnType }) {
  const { getColumnTasks, addNewTask, dropTaskFrom } = useKanbanContext()
  const ColumnTasks = getColumnTasks(column)
  const { dropRef, isOver } = useColumnDrop(column, dropTaskFrom)

  const tasks =
    ColumnTasks && ColumnTasks.length > 0
      ? ColumnTasks.map((task: TaskModel, index: number) => (
          <Task key={task.id} index={index} task={task} />
        ))
      : "No hay tares en esta columna"

  return (
    <article className={styles.column}>
      <header>
        <h1>{column}</h1>
        <button onClick={() => addNewTask(column)}>+</button>
      </header>
      <section className={styles.tasks} ref={dropRef}>
        {tasks}
      </section>
    </article>
  )
}
