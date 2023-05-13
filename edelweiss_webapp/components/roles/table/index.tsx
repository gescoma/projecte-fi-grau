"use client"

import { useEffect, useMemo, useState } from "react"
import { Avatar } from "@/components/user/avatar"
import Image from "next/image"
import { Sidebar } from "./sidebar"
import { Table } from "@/components/table"
import styles from "./table.module.css"
import { useSupabase } from "@/context/AuthContext"



export function RolTable({roles}:any) {


  const data = useMemo(() => roles, [roles])
  const column = useMemo(
    () => [
      {
        Header: "Codigo",
        accessor: "codigo",
      },
      {
        Header: "Nombre",
        accessor: "nombre",
      },
      /*{
        Header: "Photo",
        accessor: "property.image",
        disablesortby: true,
        Cell: ({ row: { original } }: { row: { original: PropertiesRow } }) => (
          <Image
            src={original.property.image}
            alt={`Image of the building ${original.property.address}`}
            width={80}
            height={40}
          />
        ),
      },*/
      {
        Header: "Descripcion",
        accessor: "descripcion",
      },
      {
        Header: "Fecha creacion",
        accessor: "fecha_creacion",
      },
      {
        Header: "Fecha modificacion",
        accessor: "fecha_modificacion",
        disablesortby: true,
      },
    ],
    []
  )

  return (
    <div>
        <section className={styles.table}>
          <Table
            data={data}
            columns={column}
            expandable
            sidebar={Sidebar}
          /> 
         
        </section>
    </div>
  )
}