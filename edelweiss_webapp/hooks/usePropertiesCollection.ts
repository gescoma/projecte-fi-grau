import { useCallback, useEffect, useState } from "react"

import { Database } from "@/types/database.types"
import Swal from "sweetalert2"
import toaster from "react-hot-toast"
import { useSupabase } from "@/context/AuthContext"

export type PropertiesMaybe = PropertyMaybe[] | null
export type PropertyMaybe = Database["public"]["Tables"]["vivienda"]["Row"] | null

export type PropertiesRow = PropertyRow[]
export type PropertyRow = {
  id: string
  address: string
  price: string
  owner: {
    name: string
    id: string
    avatar: string
  }
}


function formatData(data: any): PropertyRow[] {
  return data.map((client: any) => ({
    id: client.id,
    address: client.direccion,
    price: client.precio,
    owner: {
      name: `${client.users.nombre || ""}${client.users.nombre && client.users.apellidos ? " " : ""}${client.users.apellidos || ""}`,
      id: client.users.id,
      avatar: client.users.imagen || `https://unavatar.io/${client.users.nombre}${client.users.apellidos}`,
    }
  }))
}

export function usePropertiesCollection() {
  const [properties, setProperties] = useState<PropertiesMaybe>()
  const [formatedData, setFormatedData] = useState<PropertyRow[]>([])
  const [propertiesStatus, setPropertiesStatus] = useState<any>([{
    label: "Todos",
    value: "all"
  }])
  const [loading, setLoading] = useState(false)
  const { supabase } = useSupabase()
  const [owners, setOwners] = useState<any>([])

  useEffect(() => {
    setLoading(true)
    supabase
      .from("vivienda")
      .select(
        `
      *,
      users(nombre, apellidos, id, imagen)
    `
      )
      .order("id")
      .then(({ data, error }) => {
        if (error) throw new Error(error.message)
        setProperties(data as PropertiesMaybe)
      })
  }, [supabase])

  useEffect(() => {
    if (!properties) return
    setFormatedData(formatData(properties))
  }, [properties])

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
    getOwners()
  }, [getOwners])

  const createProperty = async (client: any) => {
    const { data, error } = await supabase
      .from("vivienda")
      .insert(client)
      .select()
    if (error) throw new Error(error.message)
    if (!data) throw new Error("No se ha podido crear el cliente")
    const newClient: any = structuredClone(data[0])
    const { data: dataOwner } = await supabase
      .from("users")
      .select()
      .eq("id", client.id_usuario)
      .single()
    if (!dataOwner) throw new Error("No se ha podido crear el cliente")
    newClient.users = dataOwner
    setProperties((oldClients) => {
      if (!oldClients) return [newClient]
      const newClients = structuredClone(oldClients)
      newClients.push(newClient)
      return newClients
    })
    toaster.success("Cliente creado")
    return { data, error }
  }
  
  const batchDelete = (ids: string[]) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Eliminaras todas las viviendas seleccionadas",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--color-danger-50)",
      cancelButtonColor: "var(--color-black-50)",
      confirmButtonText: "Sí, eliminarlos",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { error } = await supabase
          .from("vivienda")
          .delete()
          .in("id", ids)
          .select()
        if (error) throw new Error(error.message)
        setProperties((oldProperties) =>
          (oldProperties as any).filter((property: any) => !ids.includes(property.id))
        )
        toaster.success("Viviendas eliminadas")
        return
      }
      return
    })
  }

  return {
    properties,
    formatedData,
    owners,
    loading,
    propertiesStatus,
    createProperty,
    batchDelete,
  }
}
