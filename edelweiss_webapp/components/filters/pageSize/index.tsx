export function PageSize({
  pageSize,
  setPageSize,
  total,
}: {
  pageSize: number
  setPageSize: any
  total: number
}) {
  return (
    <>
      <span>Mostrando </span>
      <select
        value={pageSize}
        onChange={(e) => {
          setPageSize(Number(e.target.value))
        }}
      >
        {[10, 20, 30, 40, 50].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            {pageSize}
          </option>
        ))}
      </select>
      <span> de {total} resultados</span>
    </>
  )
}
