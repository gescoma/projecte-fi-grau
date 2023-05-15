"use client"

import { Card } from "@/components/card"
import { Compra } from "@/components/compra"
import { ComprasProvider } from "@/context/ComprasContext"
import { DashboardHead } from "@/components/dashboard/dashboard-head"

export default function Users() {
  return (
    <ComprasProvider>
      <DashboardHead>Compras</DashboardHead>
      <Card>
        <Compra />
      </Card>
    </ComprasProvider>
  )
}
