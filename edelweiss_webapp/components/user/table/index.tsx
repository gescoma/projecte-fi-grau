"use client"

import { useEffect, useMemo, useState } from "react"
import { Avatar } from "@/components/user/avatar"
import Image from "next/image"
import { Sidebar } from "./sidebar"
import { Table } from "@/components/table"
import styles from "./table.module.css"
import { useSupabase } from "@/context/AuthContext"


type PropertiesRow = {
  status: string
  date: Date
  property: {
    id: string
    address: string
    city: string
    state: string
    zip: string
    price: string
    image: string
  }
  type: string
  owner: {
    id: string
    name: string
    surname: string
    email: string
    image: string
  }
  customer: {
    id: string
    name: string
    surname: string
    email: string
    image: string
  }
}
const user = {
    "id": "74d04474-2d35-4e99-aa93-f2a326f24d05",
    "updated_at": null,
    "nombre": "Jaime Vivoy",
    "apellidos": null,
    "email": "soviet07@edelweiss.com",
    "rol": null,
    "imagen": "https://unavatar.io/soviet07",
    "website": null,
    "fecha_creacion": "2023-05-12T15:28:35",
    "fecha_modificacion": "2023-05-12T15:28:35"
}

export function UserTable({usuarios}:any) {


  const data = useMemo(() => usuarios, [usuarios])
  const column = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
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
        Header: "Apellidos",
        accessor: "apellidos",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Rol",
        accessor: "rol",
        disablesortby: true,
      },
      {
        Header: "Website",
        accessor: "website",
      },
      /*{
        Header: "Estado",
        accessor: "status",
        disablesortby: true,
      },*/
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
