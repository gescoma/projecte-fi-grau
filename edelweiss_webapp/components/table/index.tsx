"use client"

import {
  ComponentType,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react"
import { FiArrowDown, FiArrowUp } from "react-icons/fi"
import {
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
import { useDebounce } from "@/hooks/useDebounce"

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

  const filterGlobal = useDebounce(globalFilters)

  const debouncedGlobalFilter = useEffect(() => {
    Object.entries(filters).forEach(([key, value]) => {
      if (key === "filters") return
      setFilter(key, value)
    })
  }, [filters, setFilter])

  useEffect(() => {
    setGlobalFilter(filterGlobal)
  }, [filterGlobal, setGlobalFilter])
  
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
        <thead className={styles.tableHead}>
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
                      <div className={styles.headers}>
                        <div className={styles.title}>
                          {column.render("Header")}
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              <FiArrowDown />
                            ) : (
                              <FiArrowUp />
                            )
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
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
                        <td
                          {...restOfProps}
                          key={td_key}
                          className={styles.checkbox}
                        >
                          <div className={styles.selector}>
                            {cell.render("Cell")}
                          </div>
                        </td>
                      )
                    }
                    return (
                      <td {...restOfProps} key={td_key} onClick={toogleSidebar}>
                        <div>{cell.render("Cell")}</div>
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
      <div className={styles.footer}>
        <Footer
          pageSize={pageSize}
          setPageSize={setPageSize}
          itemsCount={rows.length}
          page={pageIndex}
          setPage={gotoPage}
          showPagination
        />
      </div>
    </>
  )
}
