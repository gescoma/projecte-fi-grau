"use client"

import { FiTrash } from "react-icons/fi"
import { SidebarLayout } from "@/components/sidebar/sidebar"
import styles from "./task.module.css"
import { useDragAndDrop } from "@/hooks/useTaskDragAndDrop"
import {
  ComponentType,
  MouseEventHandler,
  useRef,
  useState,
  MouseEvent,
} from "react"
import { useComprasContext } from "@/context/ComprasContext"

type TaskProps = {
  index: number
  task: any
  sidebar?: ComponentType<any>
}

export function Task({ index, task, sidebar: Sidebar }: TaskProps) {
  const { deleteTask } = useComprasContext()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { ref, isDragging } = useDragAndDrop<HTMLDivElement>({
    task,
    index,
  })
  const deleteRef = useRef<HTMLButtonElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    if (e.target === deleteRef.current) return
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleDelete = () => {
    deleteTask(task)
  }

  const handleClickClose = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <>
      <article ref={ref} className={styles.card} onClick={handleClick}>
        <button ref={deleteRef} className={styles.trash} onClick={handleDelete}>
          <FiTrash />
        </button>
        <h1>{task.nombre}</h1>
        <p>{task.descripcion}</p>
      </article>
      {isSidebarOpen && (
        <SidebarLayout closeAction={handleClickClose}>
          {Sidebar && <Sidebar data={task} />}
        </SidebarLayout>
      )}
    </>
  )
}
