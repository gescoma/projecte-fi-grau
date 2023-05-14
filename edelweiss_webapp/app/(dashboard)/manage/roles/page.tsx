"use client"

import { Card } from "@/components/card"
import { DashboardHead } from "@/components/dashboard/dashboard-head"
import { EntidadesTable } from "@/components/entidades/table"
import { RolTable } from "@/components/roles/table"
import { Table } from "@/components/table"
import { UserTable } from "@/components/user/table"
import { useSupabase } from "@/context/AuthContext"
import { useEffect, useState } from "react"


export default function Roles() {
  const {supabase} = useSupabase()
  const [rolesStorage,setRolesStorage] = useState<any>()
  useEffect(()=>{supabase.from("roles").select().then(({data,error})=>{
    if(error){
    throw new Error(error.message) 
  }
  console.log(data)
  setRolesStorage(data)
  })},[])
  return (
    <>
      <DashboardHead>Gestión de roles</DashboardHead>
      <Card>
        <h2>Gestión de roles</h2>
        {rolesStorage &&<RolTable roles={rolesStorage}/>} 
      </Card>
    </>
  )
}