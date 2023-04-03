export default async function PublicPageLayout({
  children
}: {
  children: React.ReactNode,
}) {
  return (
    <div>
      <h1>Public Page</h1>
      {children}
    </div>
  )
}