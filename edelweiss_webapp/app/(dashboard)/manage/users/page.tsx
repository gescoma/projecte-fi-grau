import { nextUser } from "@/types/nextUser"
import { serverAPIFetch } from "@/utils/serverFetch"

export default async function Users() {
  const request = await serverAPIFetch(`/clients/`)
  const users = (await request.json()) || null

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.length > 0 &&
          users.map((user: nextUser, index: number) => (
            <li key={index}>{user.name}</li>
          ))}
      </ul>
    </div>
  )
}
