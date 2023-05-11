"use client"

import { SearchBox } from "@/components/input/searchBox"
import styles from "./head.module.css"
import { useState } from "react"

export function DashboardHead({ children }: { children: string }) {
  const [search, setSearch] = useState("")
  return (
    <div className={styles.head}>
      <h1>{children}</h1>
      <SearchBox onChange={setSearch} value={search} />
    </div>
  )
}
