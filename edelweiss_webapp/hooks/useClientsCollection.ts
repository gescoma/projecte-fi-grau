import { useEffect, useState } from "react";

import { Database } from "@/types/database.types";
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
  source: string
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
    source: client?.entidades?.nombre,
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

  const createClient = async (client: any) => {
    const {data, error} = await supabase.from("cliente").insert(client).select();
    if(error) throw new Error(error.message);
    console.log({data})
    setClients([...clients as any, data[0] as any])
    setFormatedData([...formatedData, formatData([data as any])[0]])
    return data;
  }

  console.log({formatedData})

  return { clients, formatedData, loading, createClient };
}