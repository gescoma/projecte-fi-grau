import { ComponentType, useEffect, useState } from "react"

import { Footer } from "../filters/footer"
import { GridElement } from "./gridComponent"
import styles from "./grid.module.css"
import { useAsyncDebounce } from "react-table"

export function Grid({
  data,
  filters = {},
  globalFilters = "",
  sidebar: Sidebar,
  expandable = false,
  element: Element,
}: {
  data: any
  filters?: any
  globalFilters?: string
  sidebar?: ComponentType<any>
  expandable?: boolean
  element: ComponentType<any>
}) {
  const [content, setContent] = useState(data)
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const filterData = (data: any, filters: any) => {
    if (!filters.filters && globalFilters === "") return data
    const entries = Object.entries(filters)
    const filterKeys = entries.slice(0, -1)
    let dataToFilter = data.filter((item: any) => {
      if (globalFilters === "" && !filters.filters) return true
      return filterKeys.every(([key, value]) => {
        if (value === "") return true
        return item[key] === value
      })
    })
    return dataToFilter
  }

  const filteredData = useAsyncDebounce(() => {
    return filterData(data, filters)
  }, 200)

  useEffect(() => {
    filteredData().then((res: any) => {
      setContent(res)
    })
  }, [filters, globalFilters, filteredData])

  return (
    <>
      <section className={styles.grid}>
        {content &&
          content
            .slice(0 + page * pageSize, pageSize + page * pageSize)
            .map((item: any) => (
              <GridElement
                item={item}
                key={item.id}
                expandable={expandable}
                sidebar={Sidebar}
              >
                <Element data={item}>/</Element>
              </GridElement>
            ))}
      </section>
      <Footer
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        itemsCount={content.length}
        showPagination
        showResults
        showPageSize
        showPageSelector
      />
    </>
  )
}
