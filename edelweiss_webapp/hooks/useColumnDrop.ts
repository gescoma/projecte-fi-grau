import { ColumnType, ItemType } from "@/utils/kanban/enums";
import { DragItem, TaskModel } from "@/utils/kanban/models";

import { useDrop } from "react-dnd";

export function useColumnDrop(
  column: string,
  handleDrop: (fromColumn: string, taskId: TaskModel["id"], to: ColumnType) => void
  ) {
    const [{ isOver }, dropRef] = useDrop<DragItem, void, { isOver: boolean }>({
      accept: ItemType.TASK,
      drop: (dragItem) => {
        if(!dragItem || dragItem.from === column) {
          return;
        }
        handleDrop(dragItem.from, dragItem.id, column as any)
      },
      collect: (monitor) => ({
        isOver: monitor.isOver()
      })
    })

    return {
      dropRef,
      isOver
    }
  }