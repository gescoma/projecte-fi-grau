"use client"

import { Card } from "@/components/card"
import { DashboardHead } from "@/components/dashboard/dashboard-head"
import { EntidadesTable } from "@/components/entidades/table"
import { RolTable } from "@/components/roles/table"
import { Table } from "@/components/table"
import { UserTable } from "@/components/user/table"
import { useSupabase } from "@/context/AuthContext"
import { useEffect, useState } from "react"

type ClientRow = {
  name: string
  surname: string
  phone: string
  email: string
  avatar: string
  source: string
  owner: {
    name: string
    surname: string
    avatar: string
  }
}

export default function Entidades() {
  const {supabase} = useSupabase()
  const [entidadesStorage,setEntidadesStorage] = useState<any>()
  useEffect(()=>{supabase.from("entidades").select().then(({data,error})=>{
    if(error){
    throw new Error(error.message) 
  }
  console.log(data)
  setEntidadesStorage(data)
  })},[])
  return (
    <>
      <DashboardHead>Gestión de entidades</DashboardHead>
      <Card>
        <h2>Gestión de entidades</h2>
        {entidadesStorage &&<EntidadesTable entidades={entidadesStorage}/>}
      </Card>
    </>
  )
}