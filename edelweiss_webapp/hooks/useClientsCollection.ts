import { useCallback, useEffect, useState } from "react";

import { Database } from "@/types/database.types";
import Swal from "sweetalert2";
import toaster from "react-hot-toast";
import { useSupabase } from "@/context/AuthContext";

export type ClientsMaybe = ClientMaybe[] | null;
export type ClientMaybe = Database["public"]["Tables"]["cliente"]["Row"] | null;

export type EntidadesMaybe = Entidad[] | null;
export type Entidad = Database["public"]["Tables"]["entidades"]["Row"] | null;

export type ClientRow = {
  id: string
  name: string
  surname: string
  phone: string
  email: string
  avatar: string
  source: {
    name: string
    color: string
    codigo: string
  }
  company: string
  owner: {
    name: string
    surname: string
    avatar: string
  }
}

function formatData(data:any): ClientRow[] {
  return data.map((client:any) => ({
    id: client?.id,
    name: client?.nombre,
    surname: `${client?.apellido1} ${client?.apellido2}`,
    phone: client?.telefono,
    email: client?.correo,
    image: client?.imagen || `https://unavatar.io/${client?.correo}`,
    source: {
      name: client?.entidades?.nombre,
      color: client?.entidades?.color,
      codigo: client?.entidades?.codigo,
    },
    company: client?.empresa,
    owner: {
      id: client?.users?.id,
      name: client?.users?.nombre,
      surname: client?.users?.apellidos,
      image: client?.users?.imagen || `https://unavatar.io/${client?.users?.email}`,
    }
  }))

}

export function useClientsCollection() {
  const [clients, setClients] = useState<ClientsMaybe>();
  const [formatedData, setFormatedData] = useState<ClientRow[]>([]);
  const [entidades, setEntidades] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const { supabase } = useSupabase();
  const [owners, setOwners] = useState<any>([]);

  useEffect(() => {
    setLoading(true);
    supabase.from("cliente").select(`
      *,
      entidades(codigo,color,icon,nombre,orden),
      users(nombre, apellidos, id, email, imagen)
    `).order("id").then(({ data, error }) => {
      if(error) throw new Error(error.message);
      setClients(data as any)
      setFormatedData(formatData(data))
    })

  }, [supabase])

  const getEntidades = useCallback(async () => {
    const { data, error } = await supabase.from("entidades").select();
    if(error) throw new Error(error.message);
    const entidadesConTodos = [{nombre: "Todos", codigo: "", orden: 0 }, ...data as any]
    setEntidades(entidadesConTodos as any)
  }, [supabase])

  const getOwners = useCallback(async () => {
    const { data, error } = await supabase.from("users").select('nombre, apellidos, id');
    if(error) throw new Error(error.message);
    const ownersConTodos = [{nombre: "Todos", id: "" }, ...data as any].map((owner) => ({
      name: `${owner.nombre || ""}${(owner.apellidos && owner.nombre) ? " " : ""}${owner.apellidos || ""}`,
      id: owner.id
    }))
    setOwners(ownersConTodos as any)
  }, [supabase])

  useEffect(() => {
    getEntidades();
  }, [getEntidades])

  useEffect(() => {
    getOwners();
  }, [getOwners])

  const createClient = async (client: any) => {
    const currentUser = await supabase.auth.getUser();
    const filledClient = {
      ...client,
      id_propietario: currentUser.data.user?.id
    }
    console.log({filledClient})
    const {data, error} = await supabase.from("cliente").insert(client).select();
    if(error) throw new Error(error.message);
    console.log({data})
    setClients([...clients as any, data[0] as any])
    setFormatedData([...formatedData, formatData([data as any])[0]])
    return data;
  }

  const batchDelete = (ids: string[]) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Eliminaras todos los clientes seleccionados",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--color-danger-50)",
      cancelButtonColor: "var(--color-black-50)",
      confirmButtonText: "Sí, eliminarlos",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data, error } = await supabase.from("cliente").delete().in("id", ids).select();
        if(error) throw new Error(error.message);
        setClients((clients as any).filter((client: any) => !ids.includes(client.id)))
        setFormatedData((formatedData as any).filter((client: any) => !ids.includes(client.id)))
        toaster.success("Clientes eliminados")
        return
      }
      return
    })
  }

  return { clients, formatedData, entidades, owners ,loading, createClient, batchDelete };
}