import { Card } from "@/components/card"
import { DashboardHead } from "@/components/dashboard/dashboard-head"
import { PropertiesTable } from "@/components/table/properties/table"
import { generateProperties } from "@/utils/faker/properties"

export default function PropertiesPage() {
  const properties = generateProperties()
  return (
    <>
      <DashboardHead>Propiedades</DashboardHead>
      <Card>
        <h1>Propiedades</h1>
        <PropertiesTable properties={properties} />
      </Card>
    </>
  )
}
