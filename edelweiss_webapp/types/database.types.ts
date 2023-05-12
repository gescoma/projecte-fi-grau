export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      archivo: {
        Row: {
          fecha_creacion: string | null
          fecha_modificacion: string | null
          id: number
          nombre: string
          rutaabs: string
          rutarel: string
        }
        Insert: {
          fecha_creacion?: string | null
          fecha_modificacion?: string | null
          id?: number
          nombre: string
          rutaabs: string
          rutarel: string
        }
        Update: {
          fecha_creacion?: string | null
          fecha_modificacion?: string | null
          id?: number
          nombre?: string
          rutaabs?: string
          rutarel?: string
        }
      }
      campain: {
        Row: {
          descripcion: string
          fecha_creacion: string | null
          fecha_modificacion: string | null
          id: number
          nombre: string
          periocidad: string
        }
        Insert: {
          descripcion: string
          fecha_creacion?: string | null
          fecha_modificacion?: string | null
          id?: number
          nombre: string
          periocidad: string
        }
        Update: {
          descripcion?: string
          fecha_creacion?: string | null
          fecha_modificacion?: string | null
          id?: number
          nombre?: string
          periocidad?: string
        }
      }
      cliente: {
        Row: {
          apellido1: string
          apellido2: string
          correo: string
          fecha_creacion: string | null
          fecha_modificacion: string | null
          id: number
          nacionalidad: string | null
          nombre: string
          personafisica: boolean | null
        }
        Insert: {
          apellido1: string
          apellido2: string
          correo: string
          fecha_creacion?: string | null
          fecha_modificacion?: string | null
          id?: number
          nacionalidad?: string | null
          nombre: string
          personafisica?: boolean | null
        }
        Update: {
          apellido1?: string
          apellido2?: string
          correo?: string
          fecha_creacion?: string | null
          fecha_modificacion?: string | null
          id?: number
          nacionalidad?: string | null
          nombre?: string
          personafisica?: boolean | null
        }
      }
      cliente_user_campain: {
        Row: {
          comentario: string | null
          fecha_creacion: string | null
          fecha_modificacion: string | null
          id: number
          id_campain: number
          id_cliente: number
          id_users: number
        }
        Insert: {
          comentario?: string | null
          fecha_creacion?: string | null
          fecha_modificacion?: string | null
          id?: number
          id_campain: number
          id_cliente: number
          id_users: number
        }
        Update: {
          comentario?: string | null
          fecha_creacion?: string | null
          fecha_modificacion?: string | null
          id?: number
          id_campain?: number
          id_cliente?: number
          id_users?: number
        }
      }
      compra: {
        Row: {
          fecha_creacion: string | null
          fecha_modificacion: string | null
          id: number
          id_cliente: number
          id_users: number
          id_vivienda: number
        }
        Insert: {
          fecha_creacion?: string | null
          fecha_modificacion?: string | null
          id?: number
          id_cliente: number
          id_users: number
          id_vivienda: number
        }
        Update: {
          fecha_creacion?: string | null
          fecha_modificacion?: string | null
          id?: number
          id_cliente?: number
          id_users?: number
          id_vivienda?: number
        }
      }
      proyecto: {
        Row: {
          descripcion: string | null
          fecha_creacion: string | null
          fecha_modificacion: string | null
          id: number
          id_cliente_user_campain: number | null
          id_compra: number | null
          id_users: number
          nombre: string
        }
        Insert: {
          descripcion?: string | null
          fecha_creacion?: string | null
          fecha_modificacion?: string | null
          id?: number
          id_cliente_user_campain?: number | null
          id_compra?: number | null
          id_users: number
          nombre: string
        }
        Update: {
          descripcion?: string | null
          fecha_creacion?: string | null
          fecha_modificacion?: string | null
          id?: number
          id_cliente_user_campain?: number | null
          id_compra?: number | null
          id_users?: number
          nombre?: string
        }
      }
      registrotarea: {
        Row: {
          comentario: string
          fecha_creacion: string | null
          fecha_modificacion: string | null
          id: number
          id_tarea: number
        }
        Insert: {
          comentario: string
          fecha_creacion?: string | null
          fecha_modificacion?: string | null
          id?: number
          id_tarea: number
        }
        Update: {
          comentario?: string
          fecha_creacion?: string | null
          fecha_modificacion?: string | null
          id?: number
          id_tarea?: number
        }
      }
      rolentidad: {
        Row: {
          entidad: string
          fecha_creacion: string | null
          fecha_modificacion: string | null
          id: number
          permiso: Database["public"]["Enums"]["permiso"]
          rol: string
        }
        Insert: {
          entidad: string
          fecha_creacion?: string | null
          fecha_modificacion?: string | null
          id?: number
          permiso: Database["public"]["Enums"]["permiso"]
          rol: string
        }
        Update: {
          entidad?: string
          fecha_creacion?: string | null
          fecha_modificacion?: string | null
          id?: number
          permiso?: Database["public"]["Enums"]["permiso"]
          rol?: string
        }
      }
      roles: {
        Row: {
          descripcion: string
          fecha_creacion: string | null
          fecha_modificacion: string | null
          nombre: string
        }
        Insert: {
          descripcion: string
          fecha_creacion?: string | null
          fecha_modificacion?: string | null
          nombre: string
        }
        Update: {
          descripcion?: string
          fecha_creacion?: string | null
          fecha_modificacion?: string | null
          nombre?: string
        }
      }
      tarea: {
        Row: {
          descripcion: string | null
          estado: Database["public"]["Enums"]["estado"]
          fecha_creacion: string | null
          fecha_modificacion: string | null
          id: number
          id_cliente_user_campain: number
          id_proyecto: number | null
          id_user: number
          nombre: string
        }
        Insert: {
          descripcion?: string | null
          estado: Database["public"]["Enums"]["estado"]
          fecha_creacion?: string | null
          fecha_modificacion?: string | null
          id?: number
          id_cliente_user_campain: number
          id_proyecto?: number | null
          id_user: number
          nombre: string
        }
        Update: {
          descripcion?: string | null
          estado?: Database["public"]["Enums"]["estado"]
          fecha_creacion?: string | null
          fecha_modificacion?: string | null
          id?: number
          id_cliente_user_campain?: number
          id_proyecto?: number | null
          id_user?: number
          nombre?: string
        }
      }
      tareaarchivo: {
        Row: {
          fecha_creacion: string | null
          fecha_modificacion: string | null
          id: number
          id_archivo: number
          id_tarea: number
        }
        Insert: {
          fecha_creacion?: string | null
          fecha_modificacion?: string | null
          id?: number
          id_archivo: number
          id_tarea: number
        }
        Update: {
          fecha_creacion?: string | null
          fecha_modificacion?: string | null
          id?: number
          id_archivo?: number
          id_tarea?: number
        }
      }
      tramitecompra: {
        Row: {
          descripcion: string | null
          estado: Database["public"]["Enums"]["estado"]
          fecha_creacion: string | null
          fecha_modificacion: string | null
          id: number
          id_compra: number
          id_proyecto: number | null
          id_users: number
          nombre: string
        }
        Insert: {
          descripcion?: string | null
          estado: Database["public"]["Enums"]["estado"]
          fecha_creacion?: string | null
          fecha_modificacion?: string | null
          id?: number
          id_compra: number
          id_proyecto?: number | null
          id_users: number
          nombre: string
        }
        Update: {
          descripcion?: string | null
          estado?: Database["public"]["Enums"]["estado"]
          fecha_creacion?: string | null
          fecha_modificacion?: string | null
          id?: number
          id_compra?: number
          id_proyecto?: number | null
          id_users?: number
          nombre?: string
        }
      }
      tramitecompraarchivo: {
        Row: {
          fecha_creacion: string | null
          fecha_modificacion: string | null
          id: number
          id_archivo: number
          id_tramitecompra: number
        }
        Insert: {
          fecha_creacion?: string | null
          fecha_modificacion?: string | null
          id?: number
          id_archivo: number
          id_tramitecompra: number
        }
        Update: {
          fecha_creacion?: string | null
          fecha_modificacion?: string | null
          id?: number
          id_archivo?: number
          id_tramitecompra?: number
        }
      }
      users: {
        Row: {
          apellido1: string
          email: string
          fecha_creacion: string | null
          fecha_modificacion: string | null
          id: number
          imagen: string
          login: string
          name: string
          passwd: string
          rol: string
        }
        Insert: {
          apellido1: string
          email: string
          fecha_creacion?: string | null
          fecha_modificacion?: string | null
          id?: number
          imagen: string
          login: string
          name: string
          passwd: string
          rol: string
        }
        Update: {
          apellido1?: string
          email?: string
          fecha_creacion?: string | null
          fecha_modificacion?: string | null
          id?: number
          imagen?: string
          login?: string
          name?: string
          passwd?: string
          rol?: string
        }
      }
      vivienda: {
        Row: {
          calle: string
          fecha_creacion: string | null
          fecha_modificacion: string | null
          id: number
          numero: string
          vendida: boolean
        }
        Insert: {
          calle: string
          fecha_creacion?: string | null
          fecha_modificacion?: string | null
          id?: number
          numero: string
          vendida: boolean
        }
        Update: {
          calle?: string
          fecha_creacion?: string | null
          fecha_modificacion?: string | null
          id?: number
          numero?: string
          vendida?: boolean
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      estado: "INICIO" | "ACTUALIZADA" | "FIN"
      permiso: "LEER" | "ESCRIBIR"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
