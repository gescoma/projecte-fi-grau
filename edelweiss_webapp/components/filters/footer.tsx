import { PageSelector } from "./pageSelector"
import { PageSize } from "./pageSize"
import { Pagination } from "./pagination"
import { Results } from "./results"

export function Footer({
  page,
  setPage,
  pageSize,
  setPageSize,
  itemsCount,
  showPagination = false,
  showResults = false,
  showPageSize = false,
  showPageSelector = false,
}: {
  page: number
  setPage: any
  pageSize: number
  setPageSize: any
  itemsCount: number
  showPagination?: boolean
  showResults?: boolean
  showPageSize?: boolean
  showPageSelector?: boolean
}) {
  return (
    <footer>
      <p>Footer</p>
      <Pagination
        page={page}
        setPage={setPage}
        totalPages={Math.ceil(itemsCount / pageSize)}
      />
      <Results totalResults={itemsCount} />
      <PageSize pageSize={pageSize} setPageSize={setPageSize} />
      <PageSelector page={page} setPage={setPage} />
    </footer>
  )
}
