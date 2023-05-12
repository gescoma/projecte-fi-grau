export interface EventModel {
  id: string;
  title: string;
  start: Date;
  end?: Date;
  color?: string;
  allDay?: boolean;
  meta?: any;
}