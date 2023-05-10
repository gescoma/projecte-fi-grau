"use client"

import { signOut, useSession } from "next-auth/react"

import { Avatar } from "@/components/user/avatar"
import { Button } from "@/components/button"
import { Calendar } from "@/components/calendar/calendar"
import { Card } from "@/components/card"
import { EventModel } from "@/utils/calendar/models"
import { Logo } from "@/components/logo"
import styles from "./page.module.css"
import { useCalendarEvents } from "@/hooks/useCalendarEvents"

export default function Home() {
  const { events, addEvent, removeEvent } = useCalendarEvents()

  const handleCreateEvent = () => {
    addEvent({
      id: Math.random().toString(),
      title: "New Event",
      start: new Date(),
      end: new Date(),
    })
  }

  return (
    <>
      <div className={styles.header}>
        <button onClick={handleCreateEvent}>add Event</button>
      </div>
      <Calendar events={events} sidebar={Sidebar} onDelete={removeEvent} />
    </>
  )
}

function Sidebar({
  task,
  onDelete,
}: {
  task: EventModel
  onDelete: (task: any) => void
}) {
  return (
    <>
      <button onClick={() => onDelete(task)}>delete</button>
      <h1>{task.title}</h1>
      {task && JSON.stringify(task)}
      {task && JSON.stringify(task)}
      {task && JSON.stringify(task)}
      {task && JSON.stringify(task)}
      {task && JSON.stringify(task)}
      {task && JSON.stringify(task)}
      {task && JSON.stringify(task)}
      {task && JSON.stringify(task)}
      {task && JSON.stringify(task)}
      {task && JSON.stringify(task)}
      {task && JSON.stringify(task)}
      {task && JSON.stringify(task)}
      {task && JSON.stringify(task)}
      {task && JSON.stringify(task)}
      {task && JSON.stringify(task)}
      {task && JSON.stringify(task)}
    </>
  )
}
