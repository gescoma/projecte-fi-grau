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
    start: new Date(),
  },
  {
    id: "fds",
    title: "fds",
    start: new Date(),
  },
  {
    id: "fds",
    title: "fds",
    start: new Date(),
  },
]

export default function Home() {
  return <Calendar events={events} />
}
