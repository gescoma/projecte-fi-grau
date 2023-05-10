import "react-big-calendar/lib/css/react-big-calendar.css"

import { Calendar as BigCalendar, dayjsLocalizer } from "react-big-calendar"
import { ComponentType, ReactNode, useState } from "react"

import { EventModel } from "@/utils/calendar/models"
import { SidebarLayout } from "../sidebar/sidebar"
import dayjs from "dayjs"
import timezone from "dayjs/plugin/timezone"

dayjs.extend(timezone)
const localizer = dayjsLocalizer(dayjs)

export function Calendar({
  events,
  sidebar: Sidebar,
  onDelete,
}: {
  events: EventModel[]
  sidebar: ComponentType<any>
  onDelete: (task: any) => void
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarTask, setSidebarTask] = useState<EventModel | null>(null)

  const handledDelete = (task: EventModel) => {
    onDelete(task)
    setSidebarOpen(false)
  }

  return (
    <>
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onDoubleClickEvent={(e) => {
          setSidebarOpen(true)
          setSidebarTask(e)
        }}
      />
      {sidebarOpen && (
        <SidebarLayout
          closeAction={() => {
            setSidebarOpen(false)
          }}
        >
          <Sidebar task={sidebarTask} onDelete={handledDelete} />
        </SidebarLayout>
      )}
    </>
  )
}
