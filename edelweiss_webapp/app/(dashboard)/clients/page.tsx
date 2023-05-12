"use client"

import { Card } from "@/components/card"
import { ClientsProvider } from "@/context/ClientsContext"
import { DashboardHead } from "@/components/dashboard/dashboard-head"
import { Table } from "@/components/table/clients/table"

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
    <ClientsProvider>
      <DashboardHead>Clientes</DashboardHead>
      <Card>
        <Table />
      </Card>
    </ClientsProvider>
  )
}
