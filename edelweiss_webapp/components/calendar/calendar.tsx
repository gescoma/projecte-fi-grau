import "./calendar.css"

import { Calendar as ReactCalendar, dayjsLocalizer } from "react-big-calendar"

import { EventModel } from "@/utils/calendar/models"
import dayjs from "dayjs"
import timezone from "dayjs/plugin/timezone"
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop"

const DnDCalendar = withDragAndDrop(ReactCalendar)

dayjs.extend(timezone)
const localizer = dayjsLocalizer(dayjs)

export function Calendar({ events }: { events: EventModel[] }) {
  return (
    <DnDCalendar
      localizer={localizer}
      onDoubleClickEvent={(event) => {
        console.log(event)
      }}
    />
  )
}
