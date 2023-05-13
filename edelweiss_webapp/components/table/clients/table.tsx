"use client"

import { Dialog, Transition } from "@headlessui/react"
import { FiBriefcase, FiUser } from "react-icons/fi"
import { Fragment, useEffect, useMemo, useReducer, useState } from "react"

import { AddClient } from "./addClient"
import { Avatar } from "@/components/user/avatar"
import { BUSINESS_TYPES } from "@/utils/filters/businessTypes"
import { ClearFiltersIcon } from "@/components/icons/clearFiltersIcon"
import { ContactInfo } from "@/components/filters/contactInfo"
import { DropdownBox } from "@/components/filters/dropdownBox"
import { FiltersButton } from "@/components/filters/filtersButton"
import { OWNERS } from "@/utils/filters/owners"
import { Table as OriginalTable } from "@/components/table"
import { Pill } from "@/components/pill"
import { Sidebar } from "./sidebar"
import { TabBox } from "@/components/filters/tabBox"
import styles from "./table.module.css"
import { useClientsContext } from "@/context/ClientsContext"

type ClientRow = {
  name: string
  surname: string
  phone: string
  email: string
  avatar: string
  source: {
    name: string
    color: string
  }
  owner: {
    name: string
    surname: string
    avatar: string
  }
}

const resetReducer = {
  source: BUSINESS_TYPES.all,
  owner: OWNERS[0].name,
  filters: false,
}

function reducer(state: any, action: any) {
  if (action.type === "change_business") {
    if (action.payload === "") {
      return {
        ...state,
        filters: false,
        source: action.payload,
      }
    }
    return {
      ...state,
      filters: true,
      source: action.payload,
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

  throw Error("Unknown action.")
}

export function Table() {
  const [state, dispatch] = useReducer(reducer, resetReducer)
  const [openModal, setOpenModal] = useState(false)
  const {
    formatedData: users,
    entidades,
    owners,
    createClient,
    batchDelete,
  } = useClientsContext()

  const data = useMemo(() => users, [users])
  const column = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ row: { original } }: { row: { original: ClientRow } }) => (
          <Avatar
            user={{
              ...original,
              name: `${original.name} ${original.surname}`,
            }}
            size="small"
          />
        ),
      },
      {
        Header: "Contact info",
        accessor: "surname",
        disableSortBy: true,
        Cell: ({ row: { original } }: { row: { original: ClientRow } }) => (
          <ContactInfo phone={original.phone} email={original.email} />
        ),
      },
      {
        Header: "Company",
        accessor: "company",
      },
      {
        Header: "Entidad",
        accessor: "source",
        disableSortBy: true,
        filter: (rows: any, id: any, filterValue: any) => {
          return filterValue === ""
            ? rows
            : rows.filter(
                (row: any) => row.original.source.codigo === filterValue
              )
        },
        Cell: ({ row: { original } }: { row: { original: ClientRow } }) => (
          <>
            <Pill color={original.source.color}>{original.source.name}</Pill>
          </>
        ),
      },
      {
        Header: "Owner",
        accessor: "owner",
        filter: (rows: any, id: any, filterValue: any) => {
          return filterValue === ""
            ? rows
            : rows.filter((row: any) => row.original.owner.id === filterValue)
        },
        Cell: ({ row: { original } }: { row: { original: ClientRow } }) => (
          <Avatar user={original.owner} size="small" />
        ),
      },
    ],
    []
  )

  return (
    <>
      <div className={styles.filters}>
        <div>
          <DropdownBox
            state={state.owner}
            action={(val) => {
              dispatch({ type: "change_owner", payload: val })
            }}
            data={owners}
          >
            Propietario:
          </DropdownBox>
          <TabBox
            state={state.source}
            action={(val) => {
              dispatch({ type: "change_business", payload: val })
            }}
            data={entidades}
          />
          <FiltersButton
            disabled={!state.filters}
            onClick={() => {
              dispatch({ type: "reset_filters" })
            }}
          >
            Limpiar filtros
            <ClearFiltersIcon />
          </FiltersButton>
        </div>
        <div>
          <FiltersButton onClick={() => setOpenModal(true)}>
            Add Client
          </FiltersButton>
        </div>
      </div>
      <div className={styles.table}>
        {users && (
          <OriginalTable
            columns={column}
            data={data}
            filters={state}
            expandable
            sidebar={Sidebar}
            batchDelete={batchDelete}
          />
        )}
      </div>
      <AddClient isOpen={openModal} setIsOpen={setOpenModal} />
    </>
  )
}
