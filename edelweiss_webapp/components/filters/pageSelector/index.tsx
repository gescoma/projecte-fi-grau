export function PageSelector({
  page,
  setPage,
}: {
  page: number
  setPage: any
}) {
  return (
    <input
      type="number"
      defaultValue={page + 1}
      onChange={(e) => {
        const page = e.target.value ? Number(e.target.value) - 1 : 0
        setPage(page)
      }}
      style={{ width: "100px" }}
    />
  )
}
