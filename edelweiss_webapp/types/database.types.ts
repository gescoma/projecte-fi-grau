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
      campain: {
        Row: {
          descripcion: string
          fecha_creacion: string | null
          fecha_fin: string
          fecha_inicio: string
          fecha_modificacion: string | null
          id: number
          nombre: string
          periocidad: string
        }
        Insert: {
          descripcion: string
          fecha_creacion?: string | null
          fecha_fin: string
          fecha_inicio: string
          fecha_modificacion?: string | null
          id?: number
          nombre: string
          periocidad: string
        }
        Update: {
          descripcion?: string
          fecha_creacion?: string | null
          fecha_fin?: string
          fecha_inicio?: string
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
      cliente_user_campain: {
        Row: {
          comentario: string | null
          fecha_creacion: string | null
          fecha_modificacion: string | null
          id: number
          id_campain: number
          id_cliente: number
          id_estado: string | null
          id_users: string | null
        }
        Insert: {
          comentario?: string | null
          fecha_creacion?: string | null
          fecha_modificacion?: string | null
          id?: number
          id_campain: number
          id_cliente: number
          id_estado?: string | null
          id_users?: string | null
        }
        Update: {
          comentario?: string | null
          fecha_creacion?: string | null
          fecha_modificacion?: string | null
          id?: number
          id_campain?: number
          id_cliente?: number
          id_estado?: string | null
          id_users?: string | null
        }
      }
      compra: {
        Row: {
          descripcion: string | null
          fecha_creacion: string | null
          fecha_modificacion: string | null
          id: number
          id_cliente: number
          id_user: string | null
          id_vivienda: number
          nombre: string | null
        }
        Insert: {
          descripcion?: string | null
          fecha_creacion?: string | null
          fecha_modificacion?: string | null
          id?: number
          id_cliente: number
          id_user?: string | null
          id_vivienda: number
          nombre?: string | null
        }
        Update: {
          descripcion?: string | null
          fecha_creacion?: string | null
          fecha_modificacion?: string | null
          id?: number
          id_cliente?: number
          id_user?: string | null
          id_vivienda?: number
          nombre?: string | null
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
      estadocampaña: {
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
      estadocompra: {
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
      proyecto: {
        Row: {
          descripcion: string | null
          fecha_creacion: string | null
          fecha_modificacion: string | null
          id: number
          id_cliente_user_campain: number | null
          id_compra: number | null
          id_user: string | null
          nombre: string
        }
        Insert: {
          descripcion?: string | null
          fecha_creacion?: string | null
          fecha_modificacion?: string | null
          id?: number
          id_cliente_user_campain?: number | null
          id_compra?: number | null
          id_user?: string | null
          nombre: string
        }
        Update: {
          descripcion?: string | null
          fecha_creacion?: string | null
          fecha_modificacion?: string | null
          id?: number
          id_cliente_user_campain?: number | null
          id_compra?: number | null
          id_user?: string | null
          nombre?: string
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
          codigo: string
          descripcion: string
          fecha_creacion: string | null
          fecha_modificacion: string | null
          nombre: string
        }
        Insert: {
          codigo: string
          descripcion: string
          fecha_creacion?: string | null
          fecha_modificacion?: string | null
          nombre: string
        }
        Update: {
          codigo?: string
          descripcion?: string
          fecha_creacion?: string | null
          fecha_modificacion?: string | null
          nombre?: string
        }
      }
      tramitecompra: {
        Row: {
          descripcion: string | null
          fecha_creacion: string | null
          fecha_modificacion: string | null
          id: number
          id_compra: number
          id_estado: string
          id_proyecto: number | null
          id_user: string | null
          nombre: string
        }
        Insert: {
          descripcion?: string | null
          fecha_creacion?: string | null
          fecha_modificacion?: string | null
          id?: number
          id_compra: number
          id_estado: string
          id_proyecto?: number | null
          id_user?: string | null
          nombre: string
        }
        Update: {
          descripcion?: string | null
          fecha_creacion?: string | null
          fecha_modificacion?: string | null
          id?: number
          id_compra?: number
          id_estado?: string
          id_proyecto?: number | null
          id_user?: string | null
          nombre?: string
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
      vivienda: {
        Row: {
          direccion: string
          fecha_creacion: string | null
          fecha_modificacion: string | null
          id: number
          id_usuario: string
          precio: string | null
        }
        Insert: {
          direccion: string
          fecha_creacion?: string | null
          fecha_modificacion?: string | null
          id?: number
          id_usuario: string
          precio?: string | null
        }
        Update: {
          direccion?: string
          fecha_creacion?: string | null
          fecha_modificacion?: string | null
          id?: number
          id_usuario?: string
          precio?: string | null
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
      permiso: "LEER" | "ESCRIBIR"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
