export default async function Roles() {
  const users = await fetch(`${process.env.BACKEND_DOMAIN}/clients`)
  const usersJson = await users.json()

  return (
    <div>
      <h1>Users</h1>
      {usersJson.map((user) => (
        <div key={user.dni_usuario}>
          <p>{user.nacionalidad}</p>
          <p>{user.personaFisica}</p>
        </div>
      ))}
    </div>
  )
}
