"use client"

import { useMemo, useReducer, useState } from "react"

import { Avatar } from "@/components/user/avatar"
import { ClearFilters } from "@/components/filters/clearFiltersButton"
import { DropdownBox } from "@/components/filters/dropdownBox"
import { Grid } from "@/components/grid"
import Image from "next/image"
import { Property } from "./property"
import { SearchBox } from "@/components/filters/searchBox"
import { Sidebar } from "./sidebar"
import { TabBox } from "@/components/filters/tabBox"
import { Table } from "@/components/table"

const VIEW = {
  TABLE: "table",
  GRID: "grid",
}

const resetReducer = {
  status: "",
  type: "",
  filters: false,
}

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

function reducer(state: any, action: any) {
  if (action.type === "change_state_view") {
    if (action.payload === "") {
      return {
        ...state,
        filters: false,
        status: action.payload,
      }
    }
    return {
      ...state,
      filters: true,
      status: action.payload,
    }
  }

  if (action.type === "change_type_view") {
    if (action.payload === "") {
      return {
        ...state,
        filters: false,
        type: action.payload,
      }
    }
    return {
      ...state,
      filters: true,
      type: action.payload,
    }
  }

  if (action.type === "reset_filters") {
    return resetReducer
  }

  if (action.type === "active_filters") {
    return {
      ...state,
      filters: true,
    }
  }

  if (action.type === "desactive_filters") {
    return {
      ...state,
      filters: false,
    }
  }

  // throw Error("Unknown action.")
}

export function PropertiesTable({ properties }: { properties: any }) {
  const [view, setView] = useState(VIEW.TABLE)
  const [state, dispatch] = useReducer(reducer, resetReducer)
  const [filterInput, setFilterInput] = useState("")

  const data = useMemo(() => properties, [properties])

  const column = useMemo(
    () => [
      {
        Header: "Cliente",
        accessor: "customer.name",
        Cell: ({ row: { original } }: { row: { original: PropertiesRow } }) => (
          <Avatar
            user={{
              ...original.customer,
              name: `${original.customer.name}  ${original.customer.surname}`,
            }}
            size="compressed"
          />
        ),
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

  // reduce data to et states
  const prepareData = data
    .reduce(
      (acc: any, item: any) => {
        const index = acc.findIndex((el: any) => el.label === item.status)
        if (index !== -1) {
          acc[index].items += 1
        } else {
          acc.push({
            label: item.status,
            value: item.status,
            items: 1,
          })
        }
        return acc
      },
      [
        {
          label: "Todos",
          value: "",
        },
      ]
    )
    .sort((a: any, b: any) => a.label.localeCompare(b.label))

  const prepareTypes = data
    .reduce(
      (acc: any, item: any) => {
        const index = acc.findIndex((el: any) => el.label === item.type)
        if (index !== -1) {
          acc[index].items += 1
        } else {
          acc.push({
            label: item.type,
            value: item.type,
            items: 1,
          })
        }
        return acc
      },
      [
        {
          label: "Todos",
          value: "",
        },
      ]
    )
    .sort((a: any, b: any) => a.label.localeCompare(b.label))

  return (
    <div>
      <div style={{ display: "flex" }}>
        <TabBox
          state={view}
          action={setView}
          data={[
            {
              label: "Tabla",
              value: VIEW.TABLE,
            },
            {
              label: "Grid",
              value: VIEW.GRID,
            },
          ]}
        />
        <DropdownBox
          state={state.status}
          action={(val) => {
            dispatch({ type: "change_state_view", payload: val })
          }}
          data={prepareData}
        />
        <TabBox
          state={state.type}
          action={(val) => {
            dispatch({ type: "change_type_view", payload: val })
          }}
          data={prepareTypes}
        />
        <ClearFilters
          disabled={!state.filters && filterInput === ""}
          onClick={() => {
            dispatch({ type: "reset_filters" })
            setFilterInput("")
          }}
        />
      </div>
      <div>
        <SearchBox onChange={setFilterInput} value={filterInput} />
      </div>
      {view === VIEW.TABLE && (
        <section>
          <Table
            data={data}
            columns={column}
            expandable
            sidebar={Sidebar}
            filters={state}
            globalFilters={filterInput}
          />
        </section>
      )}
      {view === VIEW.GRID && (
        <Grid
          data={data}
          expandable
          sidebar={Sidebar}
          element={Property}
          filters={state}
          globalFilters={filterInput}
        />
      )}
    </div>
  )
}
