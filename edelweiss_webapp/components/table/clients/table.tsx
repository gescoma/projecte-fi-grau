"use client"

import { useMemo, useReducer, useState } from "react"

import { Avatar } from "@/components/user/avatar"
import { BUSINESS_TYPES } from "@/utils/filters/businessTypes"
import { BusinessSelector } from "@/components/filters/business"
import { Button } from "@/components/filters/clearFilters"
import { OWNERS } from "@/utils/filters/owners"
import { Table as OriginalTable } from "@/components/table"
import { OwnerSelector } from "@/components/filters/onwers"
import { Search } from "@/components/filters/search"

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

export function Table({ users }: { users: any }) {
  const [state, dispatch] = useReducer(reducer, resetReducer)
  const [filterInput, setFilterInput] = useState("")

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
            size="compressed"
          />
        ),
      },
      {
        Header: "Contact info",
        accessor: "surname",
        disableSortBy: true,
        Cell: ({ row: { original } }: { row: { original: ClientRow } }) => (
          <>
            <p>{original.phone}</p>
            <p>{original.email}</p>
          </>
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
        Cell: ({ row: { original } }: { row: { original: ClientRow } }) => (
          <>
            <span>{original.source}</span>
          </>
        ),
      },
      {
        Header: "Owner",
        accessor: "owner",
        filter: (rows: any, id: any, filterValue: any) => {
          return filterValue === ""
            ? rows
            : rows.filter((row: any) => row.original.owner.name === filterValue)
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
      <div className="filters">
        <BusinessSelector
          value={state.business}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            dispatch({ type: "change_business", payload: e.target.value })
          }}
        />
        <OwnerSelector
          value={state.owner}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            dispatch({ type: "change_owner", payload: e.target.value })
          }}
          data={OWNERS}
        />
        <Search setValue={setFilterInput} value={filterInput} />
        <Button
          inactive={filterInput === "" && !state.filters}
          onClick={() => {
            dispatch({ type: "reset_filters" })
            setFilterInput("")
          }}
        >
          Clear filters
        </Button>
      </div>
      <OriginalTable
        columns={column}
        data={data}
        filters={state}
        globalFilters={filterInput}
      />
    </>
  )
}
