import { ColumnType } from "./enums";

export interface TaskModel {
  id: string
  title: string
  column: ColumnType
  description?: string
  user?: string
  client?: string
  dueDate?: string
  createdAt?: string
  updatedAt?: string
  attachments?: string[]
  comments?: string[]
  tags?: string[]
  priority?: string
  color: string
}

export interface TaskCollection {
  [key: string]: TaskModel
}