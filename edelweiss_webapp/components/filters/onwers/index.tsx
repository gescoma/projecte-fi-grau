"use client"

import { OWNERS, OwnersType } from "@/utils/filters/owners"

export function OwnerSelector({
  value,
  onChange,
  data,
}: {
  value: string
  onChange: any
  data: OwnersType[]
}) {
  return (
    <select value={value} onChange={onChange}>
      {data.map((s) => (
        <option key={s.label.replace(" ", "")} value={s.name}>
          {s.label}
        </option>
      ))}
    </select>
  )
}
