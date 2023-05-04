"use client"

import { useState } from "react"

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
    <div>
      <button onClick={firstPage} disabled={page === 0}>
        {"<<"}
      </button>{" "}
      <button onClick={previousPage} disabled={page === 0}>
        {"<"}
      </button>{" "}
      {pages.map((p) => {
        if (p > page + 3 || p < page - 1) {
          if (p === 2) {
            return <span key={p}>...</span>
          }
          if (p === totalPages) {
            return <span key={p}>...</span>
          }
          return null
        }
        return (
          <button
            key={p}
            onClick={() => gotoPage(p - 1)}
            disabled={page + 1 === p}
          >
            {p}
          </button>
        )
      })}
      <button onClick={nextPage} disabled={page === totalPages - 1}>
        {">"}
      </button>{" "}
      <button onClick={lastPage} disabled={page === totalPages - 1}>
        {">>"}
      </button>{" "}
    </div>
  )
}
