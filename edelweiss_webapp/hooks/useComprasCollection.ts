import { useCallback, useEffect, useState } from "react"

 
import { Database } from "@/types/database.types"
import Swal from "sweetalert2"
import toaster from "react-hot-toast"
import { useSupabase } from "@/context/AuthContext"

export type ComprasMaybe = CompraMaybe[] | null
export type CompraMaybe = Database["public"]["Tables"]["compra"]["Row"] | null

export type ComprasRow = CompraRow[]
export type CompraRow = {
  descripcion: string | null
  id: number
  nombre: string | null
  users: {
    name: string
    id: string
    avatar: string
  }
  vivienda: {
    direccion: string,
    id: number,
    precio: string
  }
  tramitecompra: {
    id: number,
    nombre: string,
    descripcion: string,
    id_estado: string,
    id_user: string,
    fecha_modificacion: string,
    proyecto: {
        id: number,
        nombre: string,
        descripcion: string,
        fecha_modificacion: string
    },
    estadocompra: {
        codigo: string,
        nombre: string,
        color: string,
        icon: string,
        orden: number,
        fecha_modificacion: string
    }
  }
  owner: {
    name: string
    id: string
    avatar: string
  }
}


function formatData(data: any): ComprasRow {
  return data.map((compra: any) => {
    const { tramitecompra } = compra
    const tramite = tramitecompra.reduce((acc: any, tramite: any) => {
      if (acc === undefined) return tramite
      if (acc.fecha_modificacion > tramite.fecha_modificacion) return acc
      return tramite
    }, {})
    return {
      descripcion: compra.descripcion,
      id: compra.id,
      nombre: compra.nombre,
      users: {
        name: `${compra.cliente.nombre || ""}${compra.cliente.nombre && compra.cliente.apellido1 ? " " : ""}${compra.cliente.apellido1 || ""}`,
        id: compra.cliente.id,
        avatar: compra.cliente.imagen || `https://unavatar.io/${compra.cliente.nombre}${compra.cliente.apellidos}`,
      },
      vivienda: {
        direccion: compra.vivienda.direccion,
        id: compra.vivienda.id,
        precio: compra.vivienda.precio
      },
      tramitecompra: {
        id: tramite.id,
        nombre: tramite.nombre,
        descripcion: tramite.descripcion,
        id_estado: tramite.id_estado,
        id_user: tramite.id_user,
        fecha_modificacion: tramite.fecha_modificacion,
        proyecto: {
          id: tramite?.proyecto?.id || null,
          nombre: tramite?.proyecto?.nombre || null,
          descripcion: tramite?.proyecto?.descripcion || null,
          fecha_modificacion: tramite?.proyecto?.fecha_modificacion || null
        },
        estadocompra: {
          codigo: tramite?.estadocompra?.codigo || null,
          nombre: tramite?.estadocompra?.nombre || null,
          color: tramite?.estadocompra?.color || null,
          icon: tramite?.estadocompra?.icon || null,
          orden: tramite?.estadocompra?.orden || null,
          fecha_modificacion: tramite?.estadocompra?.fecha_modificacion || null
        }
      },
      owner: {
        name: `${compra.users.nombre || ""}${compra.users.nombre && compra.users.apellidos ? " " : ""}${compra.users.apellidos || ""}`,
        id: compra.users.id,
        avatar: compra.users.imagen || `https://unavatar.io/${compra.users.nombre}${compra.users.apellidos}`,
      }
    }
  })
}

export function useComprasCollection() {
  const [compras, setCompras] = useState<ComprasMaybe>()
  const [formatedData, setFormatedData] = useState<ComprasRow>([])
  const [viviendas, setViviendas] = useState<{label: string, value: string} | null>({label: "Vivienda", value: "error"})
  const [clientes, setClientes] = useState<{label: string, value: string} | null>({label: "Cliente", value: "error"})
  const [loading, setLoading] = useState(false)
  const { supabase, user } = useSupabase()
  const [owners, setOwners] = useState<any>([])
  const [estados, setEstados] = useState<any>([])
  const [tasks, setTasks] = useState<any>(null)
  const [filters, setFilters] = useState<any>(null)
  const [filteredData, setFilteredData] = useState<any>(null)

  useEffect(() => {
    setLoading(true)
    supabase
      .from("compra")
      .select(
        `
      *,
      users(*),
      vivienda(*),
      tramitecompra(*,
        proyecto(*),
        estadocompra(*)
      ),
      cliente(*)
    `
      )
      .order("id")
      .then(({ data, error }) => {
        if (error) throw new Error(error.message)
        setCompras(data as any)
      }).then(() => setLoading(false))
  }, [supabase])

  useEffect(() => {
    if (!compras) return
    const formatedData = formatData(compras)
    setFormatedData(formatedData)
  }, [compras])

  useEffect(() => {
    supabase.from("vivienda").select("direccion, id").then(({data, error}) => {
      if (error) throw new Error(error.message)
      setViviendas(data.map((vivienda) => ({
        label: vivienda.direccion,
        value: vivienda.id
      })) as any)
    })
  }, [supabase])

  useEffect(() => {
    supabase.from("cliente").select("nombre, apellido1, apellido2, id").then(({data, error}) => {
      if (error) throw new Error(error.message)
      setClientes(data.map((cliente) => ({
        label: `${cliente.nombre || ""}${cliente.apellido1 && cliente.nombre ? " " : ""}${cliente.apellido1 || ""}${cliente.apellido1 && cliente.apellido2 ? " " : ""}${cliente.apellido2 || ""}`,
        value: cliente.id
      })) as any)
    })
  }, [supabase])

  const getOwners = useCallback(async () => {
    const { data, error } = await supabase
      .from("users")
      .select("nombre, apellidos, id")
    if (error) throw new Error(error.message)
    const ownersConTodos = [{ nombre: "Todos", id: "" }, ...(data as any)].map(
      (owner) => ({
        name: `${owner.nombre || ""}${
          owner.apellidos && owner.nombre ? " " : ""
        }${owner.apellidos || ""}`,
        id: owner.id,
      })
    )
    setOwners(ownersConTodos as any)
  }, [supabase])

  useEffect(() => {
    if(!filteredData) return
    const newCompras = filteredData.reduce((acc: any, task: any) => {
      const tramite = task.tramitecompra.id_estado === undefined ? "SIN_INICIAR" : task.tramitecompra.id_estado
        if(!acc[tramite]) {
          acc[tramite] = [task]
        } else {
          acc[tramite].push(task)
        }
        
        return acc
      }, {})
    setTasks(newCompras)
  }, [filteredData])

  useEffect(() => {
    getOwners()
  }, [getOwners])


  const getEstados = useCallback(async () => {
    const { data, error } = await supabase
      .from("estadocompra")
      .select("*")
      .order("orden")
    if (error) throw new Error(error.message)
    const ownersConTodos = [{ nombre: "Todos", id: "" }, ...(data as any)].map(
      (owner) => ({
        name: owner.nombre,
        id: owner.codigo,
      })
    )
    setEstados(ownersConTodos as any)
  }, [supabase])

  useEffect(() => {
    getEstados()
  }, [getEstados])

  useEffect(() => {
    if(!formatedData) return
    const newTaks = formatedData.filter((task: any) => {
      const objFilters = Object.entries(filters)
      const result = objFilters.reduce((acc: boolean, filter: any) => {
        if(acc === false) return false
        if(filter[0] === "filters" ) return true
        if(filter[0] === "owner" && filter[1] === "") return true
        if(filter[0] === "status" && filter[1] === "") return true
        if(filter[0] === "owner" && filter[1] === task.owner.id) return true
        if(filter[0] === "status" && filter[1] === task.tramitecompra.id_estado) return true
        return false
      }, true)
      return result
    })
    setFilteredData(newTaks)
  }, [filters, formatedData])

  const createCompra = async (client: any) => {
    const { data, error } = await supabase
      .from("compra")
      .insert(client)
      .select(`
        *,  
        users(*),
        vivienda(*),
        tramitecompra(*,
          proyecto(*),
          estadocompra(*)
        ),
        cliente(*)`
      ).single()
    if (error) throw new Error(error.message)
    if (!data) throw new Error("No se ha podido crear el cliente")
    setCompras((oldClients) => {
      if (!oldClients) return [data]
      const newClients = structuredClone(oldClients)
      newClients.push(data)
      return newClients
    })
    toaster.success("Compra creada")
    return { data, error }
  }
  
  const batchDelete = (ids: string[]) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Eliminaras todas las compras seleccionadas",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--color-danger-50)",
      cancelButtonColor: "var(--color-black-50)",
      confirmButtonText: "Sí, eliminarlos",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { error } = await supabase
          .from("compra")
          .delete()
          .in("id", ids)
          .select()
        if (error) throw new Error(error.message)
        setCompras((oldProperties) =>
          (oldProperties as any).filter((property: any) => !ids.includes(property.id))
        )
        toaster.success("Viviendas eliminadas")
        return
      }
      return
    })
  }

  // const putTask = useCallback(
  //   (newTask: TaskModel, oldTask: TaskModel) => {
  //     updateTask(newTask, oldTask)
  //   },
  //   [updateTask]
  // )

  const trashTask = (task: any) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Eliminaras la compra seleccionada",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--color-danger-50)",
      cancelButtonColor: "var(--color-black-50)",
      confirmButtonText: "Sí, eliminarla",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { error } = await supabase
          .from("compra")
          .delete()
          .eq("id", task.id)
          .select()
        if (error) throw new Error(error.message)
        setCompras((oldProperties) =>
          (oldProperties as any).filter((property: any) => property.id !== task.id)
        )
        toaster.success("Compra eliminada")
        return
      }
      return
    })
  }

  // const getTaskWithId = useCallback(
  //   (id: TaskModel["id"], from: ColumnType) => {
  //     return tasks && tasks[from].filter((task: TaskModel) => task.id === id)[0]
  //   },
  //   [tasks]
  // )

  // const dropTaskFrom = useCallback(
  //   (from: ColumnType, id: TaskModel["id"], to: ColumnType) => {
  //     const task = getTaskWithId(id, from)
  //     if (task) {
  //       const newTask = structuredClone(task)
  //       newTask.column = to
  //       updateTask(newTask, task)
  //     }
  //   },
  //   [updateTask, getTaskWithId]
  // )

  const dropTaskFrom = async (from: string, id: number, to: string) => {
    const taskToUpdate = formatedData?.filter((task: any) => task.id === id)[0]
    if(!taskToUpdate) {
      toaster.error("Error")
      return
    }
    
    if(taskToUpdate.tramitecompra.id_estado === to || (taskToUpdate.tramitecompra.id_estado === undefined && to=== "SIN_INICIAR")) {
      toaster.error("No puedes mover la tarea a la misma columna")
      return
    } 
    if(to === "SIN_INICIAR") {
      toaster.error("No puedes mover una compra inicializada a la columna sin iniciar")
      return
    }
    const realToUpdate = compras?.filter((task: any) => task.id === id)[0] as any
    const idToUpdate = taskToUpdate.tramitecompra.id
    const clone = structuredClone(realToUpdate)
    if(idToUpdate === undefined) {
      const {data, error } = await supabase.from("tramitecompra").insert({
        id_estado: to,
        id_compra: id,
        nombre: `Tarea de: ${taskToUpdate.nombre}`,
        descripcion: `Primera tarea de la compra: ${taskToUpdate.nombre}`,
        id_user: user?.id || null,
      }).select().single()
      if(error) throw new Error(error.message)
      clone.tramitecompra.push(data)
    } else {
      const {error , data} = await supabase.from("tramitecompra").update({
        id_estado: to
      }).eq("id", taskToUpdate.tramitecompra.id).select().single()
      const rest = clone.tramitecompra.filter((task: any) => task.id !== idToUpdate)
      clone.tramitecompra = [...rest, data]
    }
    setCompras((oldProperties) => {
      if (!oldProperties) return [clone] 
      const rest = oldProperties.filter((compra) => compra && compra.id !== id)

      return [clone, ...rest]
    })
    if(to === "COMPRA_FINALIZADA") {
      toaster.success("Has finalizado la compra, ¡felicidades 🥳!")
      return
    }
    toaster.success("Compra actualizada")

  }

  return {
    compras,
    formatedData,
    owners,
    estados,
    loading,
    viviendas,
    clientes,
    createCompra,
    batchDelete,
    setFilters,
    dropTaskFrom,
    deleteTask: trashTask,
    tasks
  }
}
