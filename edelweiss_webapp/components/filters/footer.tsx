import { PageSelector } from "./pageSelector"
import { PageSize } from "./pageSize"
import { Pagination } from "./pagination"
import { Results } from "./results"
import styles from "./footer.module.css"

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
    <footer className={styles.footer}>
      {showPagination && (
        <Pagination
          page={page}
          setPage={setPage}
          totalPages={Math.ceil(itemsCount / pageSize)}
        />
      )}
      {showResults && <Results totalResults={itemsCount} />}
      {showPageSize && (
        <PageSize
          pageSize={pageSize}
          setPageSize={setPageSize}
          total={itemsCount}
        />
      )}
      {showPageSelector && (
        <PageSelector
          page={page}
          setPage={setPage}
          maxPage={Math.ceil(itemsCount / pageSize)}
        />
      )}
    </footer>
  )
}
