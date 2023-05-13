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


export function UserTable({usuarios}:any) {

  const data = useMemo(async () => usuarios, [usuarios])
  const column = useMemo(
    () => [
      {
        Header: "Cliente",
        accessor: "customer.name",
      },
      {
        Header: "Id de la propiedad",
        accessor: "property.id",
      },
      {
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
      },
      {
        Header: "Dirección",
        accessor: "property.address",
        Cell: ({ row: { original } }: { row: { original: PropertiesRow } }) => (
          <>
            <span>{original.property.address}</span>
            <span>
              {original.property.zip} - {original.property.city}
            </span>
          </>
        ),
      },
      {
        Header: "Contrato",
        accessor: "type",
        disablesortby: true,
      },
      {
        Header: "Precio",
        accessor: "property.price",
      },
      {
        Header: "Fecha",
        accessor: "date",
        Cell: ({ row: { original } }: { row: { original: PropertiesRow } }) => (
          <span>{original.date.toLocaleDateString("es-ES")}</span>
        ),
      },
      {
        Header: "Estado",
        accessor: "status",
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
