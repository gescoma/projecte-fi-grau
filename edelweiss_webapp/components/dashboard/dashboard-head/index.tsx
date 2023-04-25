export function DashboardHead({ children }: { children: string }) {
  return (
    <div>
      <h1>{children}</h1>
      <input type="text" />
    </div>
  )
}
