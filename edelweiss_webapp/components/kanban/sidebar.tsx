import { TaskModel } from "@/utils/kanban/models"

export function Sidebar({ data }: { data: TaskModel }) {
  return (
    <>
      <h1>Default sidebar</h1>
      <div
        style={{
          width: "2rem",
          height: "2rem",
          background: `${data.color}`,
        }}
      ></div>
      {JSON.stringify(data, null, "  ")}
      {JSON.stringify(data, null, "  ")}
      {JSON.stringify(data, null, "  ")}v v{JSON.stringify(data, null, "  ")}
      {JSON.stringify(data, null, "  ")}v{JSON.stringify(data, null, "  ")}
      {JSON.stringify(data, null, "  ")}
      {JSON.stringify(data, null, "  ")}
      {JSON.stringify(data, null, "  ")}
      {JSON.stringify(data, null, "  ")}
      {JSON.stringify(data, null, "  ")}
      {JSON.stringify(data, null, "  ")}
      {JSON.stringify(data, null, "  ")}
      {JSON.stringify(data, null, "  ")}
      {JSON.stringify(data, null, "  ")}
      <var>hello</var>
    </>
  )
}
