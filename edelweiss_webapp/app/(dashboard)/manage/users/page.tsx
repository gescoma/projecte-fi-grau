import { DashboardHead } from "@/components/dashboard/dashboard-head"
import { nextUser } from "@/types/nextUser"
import { serverAPIFetch } from "@/utils/serverFetch"

export default async function Users() {
  const request = await serverAPIFetch(`/clients/`)
  const users = (await request.json()) || null

  return (
    <div>
      <DashboardHead>Gestión de usuarios</DashboardHead>
      <ul>
        {users.length > 0 &&
          users.map((user: nextUser, index: number) => (
            <li key={index}>{user.nombre}</li>
          ))}
      </ul>
    </div>
  )
}
