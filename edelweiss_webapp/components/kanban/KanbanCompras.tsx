import { Column } from "@/components/kanban/Column"
import { ColumnType } from "@/utils/kanban/enums"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import styles from "./kanban.module.css"
import { Sidebar } from "../compra/sidebar"

export function KanbanCompras({
  columns,
}: {
  columns: {
    id: string
    title: string
  }[]
}) {
  return (
    <DndProvider backend={HTML5Backend}>
      <section className={styles.grid}>
        <Column
          column={{
            id: "SIN_INICIAR",
            title: "Sin iniciar",
          }}
          sidebar={Sidebar}
        />
        {columns
          .filter((column) => column.title !== "Todos")
          .map((column) => (
            <Column key={column.id} sidebar={Sidebar} column={column} />
          ))}
      </section>
    </DndProvider>
  )
}
