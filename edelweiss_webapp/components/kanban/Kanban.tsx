import { Column } from "@/components/kanban/Column"
import { ColumnType } from "@/utils/kanban/enums"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { KanbanProvider } from "@/context/kanbanContext"
import styles from "./kanban.module.css"

export function Kanban({
  columns,
}: {
  columns: [
    {
      id: string
      name: string
    }
  ]
}) {
  return (
    <DndProvider backend={HTML5Backend}>
      <KanbanProvider>
        <section className={styles.grid}>
          <Column
            column={{ id: ColumnType.INICIO, title: ColumnType.INICIO }}
          />
          <Column
            column={{
              id: ColumnType.ACTUALIZADA,
              title: ColumnType.ACTUALIZADA,
            }}
          />
          <Column column={{ id: ColumnType.FIN, title: ColumnType.FIN }} />
        </section>
      </KanbanProvider>
    </DndProvider>
  )
}
