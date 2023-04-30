"use client"

import { Card } from "@/components/card"
import { DashboardHead } from "@/components/dashboard/dashboard-head"
import { Table } from "@/components/table"

type ClientRow = {
  name: string
  surname: string
  phone: string
  email: string
  avatar: string
  source: string
  owner: {
    name: string
    surname: string
    avatar: string
  }
}

export default function Users() {
  return (
    <>
      <DashboardHead>Gestión de usuarios</DashboardHead>
      <Card>
        <h2>Gestión de usuarios</h2>
      </Card>
    </>
  )
}
