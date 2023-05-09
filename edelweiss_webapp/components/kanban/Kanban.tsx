import { Column } from "@/components/kanban/Column"
import { ColumnType } from "@/utils/kanban/enums"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { KanbanProvider } from "@/context/kanbanContext"
import styles from "./kanban.module.css"

export function Kanban() {
  return (
    <DndProvider backend={HTML5Backend}>
      <KanbanProvider>
        <section className={styles.grid}>
          <Column column={ColumnType.INICIO} />
          <Column column={ColumnType.ACTUALIZADA} />
          <Column column={ColumnType.FIN} />
        </section>
      </KanbanProvider>
    </DndProvider>
  )
}
