import { Card } from "@/components/card"
import { DashboardHead } from "@/components/dashboard/dashboard-head"
import { Table } from "@/components/table"
import { TableColumns } from "@/types/tableColumns"
import { serverAPIFetch } from "@/utils/serverFetch"

const columns: TableColumns = [
  {
    id: "avatar",
    label: "Avatar",
    type: "avatar",
    avatar: {
      image: "https://unavatar.io/$nombre",
      title: "$nombre $apellido1",
      subtitle: "$correo",
    },
  },
  {
    id: "nombre",
    label: "Nombre",
    type: "string",
  },
  {
    id: "correo",
    label: "Email",
    type: "string",
  },
  {
    id: "nacionalidad",
    label: "Nacionalidad",
    type: "image",
  },
]

export default async function Users() {
  const request = await serverAPIFetch(`/clients/`)
  const users = (await request.json()) || null

  return (
    <Card>
      <DashboardHead>Gestión de usuarios</DashboardHead>
      <Table dataTable={users} columns={columns} />
    </Card>
  )
}
