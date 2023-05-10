"use client"

import { signOut, useSession } from "next-auth/react"

import { Avatar } from "@/components/user/avatar"
import { Button } from "@/components/button"
import { Calendar } from "@/components/calendar/calendar"
import { Card } from "@/components/card"
import { EventModel } from "@/utils/calendar/models"
import { Logo } from "@/components/logo"
import styles from "./page.module.css"

const events: EventModel[] = [
  {
    id: "fds",
    title: "fds",
    start: new Date(new Date().setHours(17, 0, 0, 0)),
  },
  {
    id: "fds",
    title: "fds",
    start: new Date(new Date().setHours(13, 0, 0, 0)),
  },
  {
    id: "fds",
    title: "fds",
    // start today at 10:00
    start: new Date(new Date().setHours(10, 0, 0, 0)),
  },
]

export default function Home() {
  return <Calendar events={events} />
}
