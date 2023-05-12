import { EventModel } from "@/utils/calendar/models";
import { useState } from "react";

const mockEvents: EventModel[] = [
  {
    id: "1231",
    title: "Evento 1",
    allDay: true,
    start: new Date(2023, 5, 1),
    end: new Date(2023, 5, 1),
  },
  {
    id: "3123",
    title: "Evento 2",
    start: new Date(new Date().setHours(13, 0, 0, 0)),
    end: new Date(new Date().setHours(14, 0, 0, 0)),
  },
  {
    id: "34543",
    title: "Evento 3",
    start: new Date(new Date().setHours(10, 0, 0, 0)),
    end: new Date(new Date().setHours(11, 0, 0, 0)),
  },
]


export function useCalendarEvents() {
  const [events, setEvents] = useState<EventModel[]>(mockEvents)

  const addEvent = (event: EventModel) => {
    setEvents([...events, event])
  }

  const removeEvent = (event: EventModel) => {
    setEvents((prevEvents) => prevEvents.filter((e) => e.id !== event.id))
  }

  return {
    events,
    addEvent,
    removeEvent
  }
}