"use client"

import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
  FiMoreHorizontal,
} from "react-icons/fi"

import styles from "./pagination.module.css"

export function Pagination({
  page,
  setPage,
  totalPages,
}: {
  page: number
  setPage: any
  totalPages: number
}) {
  const nextPage = () => {
    setPage(page + 1)
  }

  const previousPage = () => {
    setPage(page - 1)
  }

  const gotoPage = (page: number) => {
    setPage(page)
  }

  const firstPage = () => {
    gotoPage(0)
  }

  const lastPage = () => {
    gotoPage(totalPages - 1)
  }

  const pagesObject = () => {
    const pages = []
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
    return pages
  }

  const pages = pagesObject()

  return (
    <div className={styles.pagination}>
      <button
        onClick={firstPage}
        className={`${page === 0 && styles.disabled}`}
        disabled={page === 0}
      >
        <FiChevronsLeft />
      </button>
      <button
        onClick={previousPage}
        className={`${page === 0 && styles.disabled}`}
        disabled={page === 0}
      >
        <FiChevronLeft />
      </button>
      {pages.map((p) => {
        if (p > page + 3 || p < page - 1) {
          if (p === 2) {
            return (
              <span key={p}>
                <FiMoreHorizontal />
              </span>
            )
          }
          if (p === totalPages) {
            return (
              <span key={p}>
                <FiMoreHorizontal />
              </span>
            )
          }
          return null
        }
        return (
          <button
            key={p}
            onClick={() => gotoPage(p - 1)}
            className={`${page + 1 === p ? styles.active : ""}`}
            disabled={page + 1 === p}
          >
            {p}
          </button>
        )
      })}
      <button onClick={nextPage} disabled={page === totalPages - 1}>
        <FiChevronRight />
      </button>
      <button onClick={lastPage} disabled={page === totalPages - 1}>
        <FiChevronsRight />
      </button>
    </div>
  )
}
