"use client"

import { useMemo, useReducer, useState } from "react"

import { AddProperty } from "./addProperty"
import { Avatar } from "@/components/user/avatar"
import { DropdownBox } from "@/components/filters/dropdownBox"
import { FiltersButton } from "../filters/filtersButton"
import { Grid } from "@/components/grid"
import { Property } from "./property"
import type { PropertyRow } from "@/hooks/usePropertiesCollection"
import { Sidebar } from "./sidebar"
import { TabBox } from "@/components/filters/tabBox"
import { Table } from "@/components/table"
import styles from "./table.module.css"
import { usePropertiesContext } from "@/context/PropertiesContext"

const VIEW = {
  TABLE: "table",
  GRID: "grid",
}

const resetReducer = {
  status: "",
  owner: "",
  // type: "",
  filters: false,
}

function reducer(state: any, action: any) {
  console.log(action.payload)
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

  if (action.type === "change_owner") {
    if (action.payload === "") {
      return {
        ...state,
        filters: false,
        owner: action.payload,
      }
    }
    return {
      ...state,
      filters: true,
      owner: action.payload,
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

export function PropertiesTable() {
  const { formatedData, owners, propertiesStatus, batchDelete } =
    usePropertiesContext()
  const [view, setView] = useState(VIEW.TABLE)
  const [state, dispatch] = useReducer(reducer, resetReducer)
  const [openModal, setOpenModal] = useState(false)

  const column = useMemo(
    () => [
      {
        Header: "Id de la propiedad",
        accessor: "id",
      },
      {
        Header: "Dirección",
        accessor: "address",
      },
      {
        Header: "Precio",
        accessor: "precio",
        Cell: ({ row: { original } }: { row: { original: PropertyRow } }) => {
          return (
            <span>{original.price ? <span>{original.price} €</span> : ""}</span>
          )
        },
      },
      {
        Header: "Responsable",
        accessor: "owner",
        Cell: ({ row: { original } }: { row: { original: PropertyRow } }) => (
          <Avatar
            user={{
              ...original.owner,
              image: original.owner.avatar,
            }}
            size="small"
          />
        ),
        filter: (rows: any, id: any, filterValue: any) => {
          return filterValue === ""
            ? rows
            : rows.filter((row: any) => row.original.owner.id === filterValue)
        },
      },
      {
        Header: "cliente",
        accessor: "client.name",
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
    <>
      <div>
        <div className={styles.filters}>
          <div>
            <DropdownBox
              state={state.status}
              action={(val) => {
                dispatch({ type: "change_owner", payload: val })
              }}
              data={owners}
            >
              Responsable:
            </DropdownBox>
            <DropdownBox
              state={state.status}
              action={(val) => {
                dispatch({ type: "change_owner", payload: val })
              }}
              data={propertiesStatus}
            >
              Estado:
            </DropdownBox>
          </div>
          <div>
            <TabBox
              state={view}
              action={setView}
              data={[
                {
                  icon: "FiLayout",
                  codigo: VIEW.TABLE,
                },
                {
                  icon: "FiGrid",
                  codigo: VIEW.GRID,
                },
              ]}
            />
            <FiltersButton onClick={() => setOpenModal(true)}>
              Añadir vivienda
            </FiltersButton>

            {/* <TabBox
            state={state.type}
            action={(val) => {
              dispatch({ type: "change_type_view", payload: val })
            }}
            data={[
              {
                label: "Alquiler",
                value: "Alquiler",
              },
              {
                label: "Venta",
                value: "Venta",
              },
            ]}
          /> */}
            {/* <FiltersButton
            disabled={!state.filters && filterInput === ""}
            onClick={() => {
              dispatch({ type: "reset_filters" })
              setFilterInput("")
            }}
          >
            Nuse
          </FiltersButton> */}
          </div>
        </div>
        {view === VIEW.TABLE && (
          <section className={styles.table}>
            <Table
              data={formatedData || []}
              columns={column}
              expandable
              sidebar={Sidebar}
              filters={state}
              batchDelete={batchDelete}
            />
          </section>
        )}
        {view === VIEW.GRID && (
          <section className={styles.table}>
            <Grid
              data={formatedData || []}
              expandable
              sidebar={Sidebar}
              element={Property}
              filters={state}
            />
          </section>
        )}
      </div>
      <AddProperty isOpen={openModal} setIsOpen={setOpenModal} />
    </>
  )
}
