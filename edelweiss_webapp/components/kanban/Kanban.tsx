import { Column } from "@/components/kanban/Column"
import { ColumnType } from "@/utils/kanban/enums"
import { KanbanProvider } from "@/context/kanbanContext"
import styles from "./kanban.module.css"

export function Kanban() {
  return (
    <KanbanProvider>
      <section className={styles.grid}>
        <Column column={ColumnType.INICIO} />
        <Column column={ColumnType.ACTUALIZADA} />
        <Column column={ColumnType.FIN} />
      </section>
    </KanbanProvider>
  )
}
