"use client"

import { TaskCollection, TaskModel } from "@/utils/kanban/models";
import { useEffect, useState } from "react";

import { faker } from "@faker-js/faker";

export function useTaskCollection() {
  const [tasks, setTasks] = useState<any>({})

  useEffect(() => {
    fetch("https://cdbcaegvdoxoaczugjfw.supabase.co/rest/v1/tarea?select=*", {
      method: "GET",
      headers: {
        "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkYmNhZWd2ZG94b2FjenVnamZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMxMTY2NzEsImV4cCI6MTk5ODY5MjY3MX0.Xpjq2oBIg0sYs-yJ8QVzHxYuL1AFZ0HJHWs3injDArY",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkYmNhZWd2ZG94b2FjenVnamZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMxMTY2NzEsImV4cCI6MTk5ODY5MjY3MX0.Xpjq2oBIg0sYs-yJ8QVzHxYuL1AFZ0HJHWs3injDArY"
      }
    }).then(res => {
      return res.json()
    }).then((data) => {
      const newdata = data.map((task: any) => ({
          id: task.id,
          title: task.nombre,
          column: task.estado,
          description: task.descripcion,
          user: task.id_cliente_user_campain,
          color: faker.color.rgb({ format: 'css' })
        })).reduce((acc: any, task: any) => {
          if(!acc[task.column]) {
            acc[task.column] = [task]
          } else {
            acc[task.column].push(task)
          }
          
          return acc
        }, {})
      setTasks(newdata)
    })

  }, [])

  const saveTask = (task: TaskModel) => {
    // Logica para guardar la tarea en la base de datos
    console.log(`Method to save task ${JSON.stringify(task)}`)
  }

  return {tasks, saveTask}
}
