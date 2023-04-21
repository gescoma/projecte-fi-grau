import { serverAPIFetch } from "@/utils/serverFetch"

export default async function Users() {
  const request = await serverAPIFetch(`/clients`)
  const users = await request.json()

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.nacionalidad}</li>
        ))}
      </ul>
    </div>
  )
}
