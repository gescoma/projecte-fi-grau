export function PageSize({
  pageSize,
  setPageSize,
}: {
  pageSize: number
  setPageSize: any
}) {
  return (
    <select
      value={pageSize}
      onChange={(e) => {
        setPageSize(Number(e.target.value))
      }}
    >
      {[10, 20, 30, 40, 50].map((pageSize) => (
        <option key={pageSize} value={pageSize}>
          Show {pageSize}
        </option>
      ))}
    </select>
  )
}
