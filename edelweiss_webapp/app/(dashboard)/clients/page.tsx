"use client"

import { Card } from "@/components/card"
import { DashboardHead } from "@/components/dashboard/dashboard-head"
import { Table } from "@/components/table/clients/table"
import { generateUsers } from "@/utils/faker/users"

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
  const users = generateUsers()

  return (
    <>
      <DashboardHead>Clientes</DashboardHead>
      <Card>
        <Table users={users}></Table>
      </Card>
    </>
  )
}
