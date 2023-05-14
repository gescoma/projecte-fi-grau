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
      cliente: {
        Row: {
          apellido1: string
          apellido2: string
          correo: string
          empresa: string | null
          fecha_creacion: string | null
          fecha_modificacion: string | null
          id: number
          id_entidad: string
          id_propietario: string
          imagen: string | null
          nacionalidad: string | null
          nombre: string
          telefono: string | null
        }
        Insert: {
          apellido1: string
          apellido2: string
          correo: string
          empresa?: string | null
          fecha_creacion?: string | null
          fecha_modificacion?: string | null
          id?: number
          id_entidad: string
          id_propietario: string
          imagen?: string | null
          nacionalidad?: string | null
          nombre: string
          telefono?: string | null
        }
        Update: {
          apellido1?: string
          apellido2?: string
          correo?: string
          empresa?: string | null
          fecha_creacion?: string | null
          fecha_modificacion?: string | null
          id?: number
          id_entidad?: string
          id_propietario?: string
          imagen?: string | null
          nacionalidad?: string | null
          nombre?: string
          telefono?: string | null
        }
      }
      entidades: {
        Row: {
          codigo: string
          color: string | null
          fecha_creacion: string | null
          fecha_modificacion: string | null
          icon: string | null
          nombre: string
          orden: number
        }
        Insert: {
          codigo: string
          color?: string | null
          fecha_creacion?: string | null
          fecha_modificacion?: string | null
          icon?: string | null
          nombre: string
          orden: number
        }
        Update: {
          codigo?: string
          color?: string | null
          fecha_creacion?: string | null
          fecha_modificacion?: string | null
          icon?: string | null
          nombre?: string
          orden?: number
        }
      }
      users: {
        Row: {
          apellidos: string | null
          email: string | null
          fecha_creacion: string | null
          fecha_modificacion: string | null
          id: string
          imagen: string | null
          nombre: string | null
          rol: string | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          apellidos?: string | null
          email?: string | null
          fecha_creacion?: string | null
          fecha_modificacion?: string | null
          id: string
          imagen?: string | null
          nombre?: string | null
          rol?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          apellidos?: string | null
          email?: string | null
          fecha_creacion?: string | null
          fecha_modificacion?: string | null
          id?: string
          imagen?: string | null
          nombre?: string | null
          rol?: string | null
          updated_at?: string | null
          website?: string | null
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
