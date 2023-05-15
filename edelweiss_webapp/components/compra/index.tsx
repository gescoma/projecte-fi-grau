import { useEffect, useMemo, useReducer, useState } from "react"

import { AddCompra } from "./addCompra"
import { Avatar } from "../user/avatar"
import { ClientRow } from "@/hooks/useClientsCollection"
import { CompraRow } from "@/hooks/useComprasCollection"
import { DropdownBox } from "@/components/filters/dropdownBox"
import { FiltersButton } from "@/components/filters/filtersButton"
import { KanbanCompras } from "../kanban/KanbanCompras"
import { Pill } from "@/components/pill"
import { Sidebar } from "./sidebar"
import { TabBox } from "@/components/filters/tabBox"
import { Table } from "@/components/table"
import styles from "./styles.module.css"
import { useComprasContext } from "@/context/ComprasContext"
import { ClearFiltersIcon } from "../icons/clearFiltersIcon"

const VIEW = {
  TABLE: "table",
  KANBAN: "kanban",
}

const VIEWDATA = {
  TABLE: {
    codigo: "table",
    nombre: "Tabla",
    icon: "FiLayout",
  },
  KANBAN: {
    codigo: "kanban",
    nombre: "Kanban",
    icon: "FiTrello",
  },
}

const resetReducer = {
  status: "",
  owner: "",
  // type: "",
  filters: false,
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
      owner: action.payload || "",
    }
  }

  if (action.type === "change_estado") {
    if (action.payload === undefined) {
      return {
        ...state,
        filters: false,
        status: action.payload || "",
      }
    }
    if (action.payload === "") {
      return {
        ...state,
        filters: false,
        status: action.payload || "",
      }
    }
    return {
      ...state,
      filters: true,
      status: action.payload,
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

export function Compra() {
  const [currentView, setView] = useState(VIEW.TABLE)
  const [state, dispatch] = useReducer(reducer, resetReducer)
  const {
    formatedData: compras,
    owners,
    estados,
    batchDelete,
    setFilters,
  } = useComprasContext()
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    setFilters(state)
  }, [state, setFilters])

  const column = useMemo(
    () => [
      {
        Header: "Nombre",
        accessor: "nombre",
      },
      {
        Header: "Descripción",
        accessor: "descripcion",
      },
      {
        Header: "Cliente",
        accessor: "cliente",
        Cell: ({ row: { original } }: { row: { original: CompraRow } }) => {
          const { users } = original
          return (
            <Avatar
              user={{
                ...users,
                image: users.avatar,
              }}
              size="small"
            />
          )
        },
        filter: (rows: any, id: any, filterValue: any) => {
          return filterValue === ""
            ? rows
            : rows.filter((row: any) => row.original.owner.id === filterValue)
        },
      },
      {
        Header: "Tarea actual",
        accessor: "tramitecompra.nombre",
        Cell: ({ row: { original } }: { row: { original: CompraRow } }) => {
          const { tramitecompra } = original
          return (
            <span className="text-xs">
              {tramitecompra.nombre
                ? tramitecompra.nombre
                : "Compra no inicializada"}
            </span>
          )
        },
      },
      {
        Header: "Estado",
        accessor: "status",
        disablesortby: true,
        Cell: ({ row: { original } }: { row: { original: CompraRow } }) => {
          const { tramitecompra } = original
          return (
            <Pill
              color={
                tramitecompra.estadocompra.color
                  ? tramitecompra.estadocompra.color
                  : "#bdc3c7"
              }
              size="small"
            >
              {tramitecompra.estadocompra.nombre
                ? tramitecompra.estadocompra.nombre
                : "Compra no inicializada"}
            </Pill>
          )
        },
        filter: (rows: any, id: any, filterValue: any) =>
          filterValue === ""
            ? rows
            : rows.filter(
                (row: any) =>
                  row.original.tramitecompra.id_estado === filterValue
              ),
      },
      {
        Header: "Responsable",
        accessor: "owner",
        Cell: ({ row: { original } }: { row: { original: ClientRow } }) => (
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
                dispatch({ type: "change_estado", payload: val })
              }}
              data={estados}
            >
              Estado:
            </DropdownBox>
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
            <TabBox
              state={currentView}
              action={setView}
              data={[VIEWDATA.TABLE, VIEWDATA.KANBAN]}
            />

            <FiltersButton onClick={() => setOpenModal(true)}>
              Añadir compra
            </FiltersButton>
          </div>
        </div>
        {currentView === VIEW.TABLE && (
          <section className={styles.table}>
            <Table
              data={compras || []}
              columns={column}
              expandable
              sidebar={Sidebar}
              filters={state}
              batchDelete={batchDelete}
            />
          </section>
        )}
        {currentView === VIEW.KANBAN && (
          <KanbanCompras
            columns={estados.map((estado: any) => {
              return {
                id: estado.id,
                title: estado.name,
              }
            })}
          />
        )}
      </div>
      <AddCompra isOpen={openModal} setIsOpen={setOpenModal} />
    </>
  )
}
