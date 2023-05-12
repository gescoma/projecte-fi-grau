"use client"

import { FiTrash } from "react-icons/fi"
import { Sidebar } from "./sidebar"
import { SidebarLayout } from "@/components/sidebar/sidebar"
import { TaskModel } from "@/utils/kanban/models"
import styles from "./task.module.css"
import { useDragAndDrop } from "@/hooks/useTaskDragAndDrop"
import { useKanbanContext } from "@/context/kanbanContext"
import { useState } from "react"

type TaskProps = {
  index: number
  task: TaskModel
}

export function Task({ index, task }: TaskProps) {
  const { deleteTask } = useKanbanContext()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { ref, isDragging } = useDragAndDrop<HTMLDivElement>({
    task,
    index,
  })

  const handleClick = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <>
      <article ref={ref} className={styles.card} onClick={handleClick}>
        <button className={styles.trash} onClick={() => deleteTask(task)}>
          <FiTrash />
        </button>
        <h1>{task.title}</h1>
        <p>{task.description}</p>
        <button onClick={handleClick}>Open</button>
      </article>
      {isSidebarOpen && (
        <SidebarLayout closeAction={handleClick}>
          <Sidebar item={task} />
        </SidebarLayout>
      )}
    </>
  )
}
