"use client"

import {
  ComponentType,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react"
import {
  useAsyncDebounce,
  useExpanded,
  useFilters,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table"

import { Footer } from "../filters/footer"
import { IndeterminateCheckbox } from "@/components/filters/selectionBox"
import { SearchBox } from "../filters/searchBox"
import { SidebarLayout } from "@/components/sidebar/sidebar"
import styles from "./table.module.css"

export function Table({
  data,
  columns,
  filters = {},
  sidebar: Sidebar,
  expandable = false,
}: {
  data: any
  columns: any
  filters?: any
  sidebar?: ComponentType<any>
  expandable?: boolean
}) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    gotoPage,
    setPageSize,
    rows,
    state: { pageIndex, pageSize, globalFilter },
    setFilter,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: "selection",
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllPageRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ])
    }
  )
  const [globalFilters, setGlobalFilters] = useState("")

  const debouncedGlobalFilter = useAsyncDebounce(setGlobalFilter, 200)

  useEffect(() => {
    Object.entries(filters).forEach(([key, value]) => {
      if (key === "filters") return
      setFilter(key, value)
    })
  }, [filters, setFilter])

  useEffect(() => {
    debouncedGlobalFilter(globalFilters)
  }, [globalFilters, debouncedGlobalFilter])

  return (
    <>
      <div className={styles.filters}>
        <SearchBox onChange={setGlobalFilters} value={globalFilters} />
        <Footer
          pageSize={pageSize}
          setPageSize={setPageSize}
          itemsCount={rows.length}
          page={pageIndex}
          setPage={gotoPage}
          showPageSize
        />
      </div>

      <table {...getTableProps()} className={styles.table}>
        <thead>
          {headerGroups.map((headerGroup) => {
            const { key: tr_key, ...restHeaderProps } =
              headerGroup.getHeaderGroupProps()
            return (
              <tr {...restHeaderProps} key={tr_key}>
                {headerGroup.headers.map((column) => {
                  const { key: th_key, ...restColumnProps } =
                    column.getHeaderProps(column.getSortByToggleProps())
                  return (
                    <th {...restColumnProps} key={th_key}>
                      {column.render("Header")}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " 🔽"
                            : " 🔼"
                          : ""}
                      </span>
                    </th>
                  )
                })}
              </tr>
            )
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            const { key: tr_key, ...rowProps } = row.getRowProps()
            const { onClick: toogleSidebar } = row.getToggleRowExpandedProps()
            return (
              <>
                <tr {...rowProps} key={tr_key} className={styles.row}>
                  {row.cells.map((cell) => {
                    const { key: td_key, ...restOfProps } = cell.getCellProps()
                    if (cell.column.id === "selection" || !expandable) {
                      return (
                        <td {...restOfProps} key={td_key}>
                          {cell.render("Cell")}
                        </td>
                      )
                    }
                    return (
                      <td {...restOfProps} key={td_key} onClick={toogleSidebar}>
                        {cell.render("Cell")}
                      </td>
                    )
                  })}
                </tr>
                {row.isExpanded && (
                  <SidebarLayout closeAction={toogleSidebar}>
                    {Sidebar ? (
                      <Sidebar data={row.original} />
                    ) : (
                      <>Error not sidebar on table props</>
                    )}
                  </SidebarLayout>
                )}
              </>
            )
          })}
        </tbody>
      </table>
      <Footer
        pageSize={pageSize}
        setPageSize={setPageSize}
        itemsCount={rows.length}
        page={pageIndex}
        setPage={gotoPage}
        showPagination
        showResults
        showPageSize
        showPageSelector
      />
    </>
  )
}
