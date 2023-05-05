export function PageSelector({
  page,
  setPage,
  maxPage,
}: {
  page: number
  setPage: any
  maxPage: number
}) {
  return (
    <input
      type="number"
      value={page + 1}
      min={1}
      max={10}
      onChange={(e) => {
        const page = e.target.value ? Number(e.target.value) - 1 : 0
        setPage(page)
      }}
      style={{ width: "100px" }}
    />
  )
}
