import Link from "next/link"

export default async function PublicPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <h1>Public Page</h1>
      <Link href="/auth/signIn">Login</Link>
      {children}
    </div>
  )
}
