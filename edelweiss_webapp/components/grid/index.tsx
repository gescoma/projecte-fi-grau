import { ReactNode, useEffect, useState } from "react"

import { IncrementalCache } from "next/dist/server/lib/incremental-cache"

export function Grid({
  data,
  columns,
  filters = {},
  globalFilters = "",
  sidebar: Sidebar,
  expandable = false,
}: {
  data: any
  columns: any
  filters?: any
  globalFilters?: string
  sidebar?: ReactNode
  expandable?: boolean
}) {
  const [content, setContent] = useState<any>(data)

  useEffect(() => {
    setContent(data)
  }, [data])

  useEffect(() => {
    if (filters) {
      const filteredData = data.filter((item: any) => {
        console.log({ item })
        return Object.keys(filters).every((key) => {
          if (filters[key] === "") return true
          return item[key] === filters[key]
        })
      })
      setContent(filteredData)
    }
  }, [filters, data])

  return (
    <section>
      {content.map((item: any) => {
        return (
          <article key={item.property.id}>
            <header>{item.customer.name}</header>
          </article>
        )
      })}
    </section>
  )
}
