import { Card } from "@/components/card"
import { DashboardHead } from "@/components/dashboard/dashboard-head"
import { PropertiesProvider } from "@/context/PropertiesContext"
import { PropertiesTable } from "@/components/properties/table"

export default function PropertiesPage() {
  return (
    <PropertiesProvider>
      <DashboardHead>Propiedades</DashboardHead>
      <Card>
        <PropertiesTable />
      </Card>
    </PropertiesProvider>
  )
}
