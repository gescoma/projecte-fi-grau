import { User } from "@/types/User"

export default async function Roles() {
  // const users = await fetch(`${process.env.BACKEND_DOMAIN}/clients`)
  // const usersJson = await users.json()

  return (
    <div>
      <h1>Users</h1>
      {/* {users &&
        usersJson.map((user: User) => (
          <div key={user.name}>
            <p>{user.name}</p>
            <p>{user.email}</p>
          </div>
        ))} */}
    </div>
  )
}
