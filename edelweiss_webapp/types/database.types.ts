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
