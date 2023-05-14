import { ComponentType, useEffect, useState } from "react"

import { Footer } from "../filters/footer"
import { GridElement } from "./gridComponent"
import { SearchBox } from "../input/searchBox"
import styles from "./grid.module.css"
import { useDebounce } from "@/hooks/useDebounce"

export function Grid({
  data,
  filters = {},
  sidebar: Sidebar,
  expandable = false,
  element: Element,
}: {
  data: any
  filters?: any
  sidebar?: ComponentType<any>
  expandable?: boolean
  element: ComponentType<any>
}) {
  const [content, setContent] = useState(data)
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [globalFilters, setGlobalFilters] = useState("")
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
    dataToFilter = dataToFilter.filter((item: any) => {
      if (globalFilters === "") return true
      return Object.values(item).some((value) => {
        if (typeof value === "string") {
          return value.toLowerCase().includes(globalFilters.toLowerCase())
        }
        if (typeof value === "number") {
          return value.toString().includes(globalFilters)
        }
        if (typeof value === "object") {
          if (value === null) return false
          return Object.values(value).some((v) => {
            if (typeof v === "string") {
              return v.toLowerCase().includes(globalFilters.toLowerCase())
            }
            if (typeof v === "number") {
              return v.toString().includes(globalFilters)
            }
          })
        }
        return false
      })
    })
    return dataToFilter
  }

  const filteredData = useDebounce(() => filterData(data, filters))

  useEffect(() => {
    setContent(filteredData)
  }, [filters, globalFilters, filteredData])

  return (
    <>
      <div className={styles.filters}>
        <div>
          <SearchBox onChange={setGlobalFilters} value={globalFilters} />
        </div>
        <Footer
          pageSize={pageSize}
          setPageSize={setPageSize}
          itemsCount={content.length}
          page={page}
          setPage={setPage}
          showPageSize
        />
      </div>
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
      />
    </>
  )
}
