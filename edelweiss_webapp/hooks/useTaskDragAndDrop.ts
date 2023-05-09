import { DragItem, TaskModel } from "@/utils/kanban/models";

import { ItemType } from "@/utils/kanban/enums";
import { useDrag } from "react-dnd";
import { useRef } from "react";

export function useDragAndDrop<T extends HTMLElement>({
  task,
  index
}: {
  task: TaskModel
  index: number
}) {
  const ref = useRef<T>(null)

  const [{isDragging}, drag] = useDrag<
    DragItem,
    void,
    { isDragging: boolean }
    >({
      type: ItemType.TASK,
      item: { from: task.column, id: task.id, index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging()
      })
    })

  drag(ref);

  return {
    ref,
    isDragging
  }

}