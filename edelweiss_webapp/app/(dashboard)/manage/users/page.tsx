"use client"

import { Card } from "@/components/card"
import { DashboardHead } from "@/components/dashboard/dashboard-head"
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

export default function Users() {
    const {supabase} = useSupabase()
  const [userStorage,setUserStorage] = useState<any>()
  useEffect(()=>{supabase.from("users").select().then(({data,error})=>{
    if(error){
    throw new Error(error.message) 
  }
  console.log(data)
  setUserStorage(data)
  })},[])
  return (
    <>
      <DashboardHead>Gestión de usuarios</DashboardHead>
      <Card>
        <h2>Gestión de usuarios</h2>
        {userStorage &&<UserTable usuarios={userStorage}/>}
      </Card>
    </>
  )
}
