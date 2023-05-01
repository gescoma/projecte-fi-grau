"use client"

import { BUSINESS_TYPES } from "@/utils/filters/businessTypes"
import { source } from "@/utils/faker/users"

export function BusinessSelector({
  value,
  onChange,
}: {
  value: string
  onChange: any
}) {
  return (
    <select value={value} onChange={onChange}>
      <option value={BUSINESS_TYPES.all}>Todos</option>
      {source.map((s) => (
        <option key={s} value={BUSINESS_TYPES[s]}>
          {s}
        </option>
      ))}
    </select>
  )
}
