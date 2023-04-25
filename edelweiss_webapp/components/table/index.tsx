"use client"

import { Avatar } from "@/components/user/avatar"
import Image from "next/image"
import { TableColumns } from "@/types/tableColumns"
import { useCallback } from "react"

export function Table({
  dataTable,
  columns,
  actions = [],
}: {
  dataTable: any
  columns: TableColumns
  actions?: any
}) {
  const formatText = useCallback((text: string) => {
    if (!text) return ""
    text = text.replaceAll("$", "")
    return text
  }, [])
  return (
    <table>
      <thead>
        <tr>
          {columns.map(({ id, label }) => (
            <th key={id}>{label}</th>
          ))}
          {actions.length > 0 && <th>Acciones</th>}
        </tr>
      </thead>
      <tbody>
        {dataTable.map((row: any, index: number) => (
          <tr key={index}>
            {columns.map(
              ({
                id,
                label,
                type,
                avatar = {
                  title: "null",
                  subtitle: "null",
                  image: "null",
                },
                align,
                format,
                minWidth,
              }) => {
                switch (type) {
                  case "string":
                    return <td key={id}>{row[id]}</td>
                  case "number":
                    return <td key={id}>{row[id]}</td>
                  case "date":
                    return <td key={id}>{row[id]}</td>
                  case "boolean":
                    return <td key={id}>{row[id]}</td>
                  case "currency":
                    return <td key={id}>{row[id]}</td>
                  case "image":
                    return (
                      <td key={id}>
                        <Image
                          src={`https://flagsapi.com/${row[id]}/flat/24.png`}
                          alt={`flag of the ${row[id]} country`}
                          width={24}
                          height={24}
                        />
                      </td>
                    )
                  case "avatar":
                    const nameFormated = formatText(avatar.title)
                    const realName = nameFormated
                      .split(" ")
                      .reduce((acc, cur) => {
                        if (!cur) return acc
                        return acc + " " + row[cur]
                      }, "")
                    const imageFormated = row[formatText(avatar.image)]
                    const name = realName
                    const email =
                      avatar.subtitle && row[formatText(avatar.subtitle)]
                    const image = (
                      (avatar.image && imageFormated) ||
                      `https://unavatar.io/${realName}`
                    ).replaceAll(" ", "")
                    return (
                      <td key={id}>
                        <Avatar
                          user={{ name, email, image }}
                          size="compressed"
                        />
                      </td>
                    )
                  default:
                    return <td key={id}>{row[id]}</td>
                }
              }
            )}
            <td>
              {actions.map((action: any, index: number) => (
                <button key={index}>{action}</button>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
