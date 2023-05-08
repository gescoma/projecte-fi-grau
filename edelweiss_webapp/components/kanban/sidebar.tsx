import { TaskModel } from "@/utils/kanban/models"

export function Sidebar({ item }: { item: TaskModel }) {
  return (
    <>
      <h1>{item.title}</h1>
      <div
        style={{
          width: "2rem",
          height: "2rem",
          background: `${item.color}`,
        }}
      ></div>
      {JSON.stringify(item, null, "  ")}
      {JSON.stringify(item, null, "  ")}
      {JSON.stringify(item, null, "  ")}v v{JSON.stringify(item, null, "  ")}
      {JSON.stringify(item, null, "  ")}v{JSON.stringify(item, null, "  ")}
      {JSON.stringify(item, null, "  ")}
      {JSON.stringify(item, null, "  ")}
      {JSON.stringify(item, null, "  ")}
      {JSON.stringify(item, null, "  ")}
      {JSON.stringify(item, null, "  ")}
      {JSON.stringify(item, null, "  ")}
      {JSON.stringify(item, null, "  ")}
      {JSON.stringify(item, null, "  ")}
      {JSON.stringify(item, null, "  ")}
      <var>hello</var>
    </>
  )
}
