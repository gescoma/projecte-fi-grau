type TableColumn = {
  id: string;
  label: string;
  type: "number" | "string" | "date" | "boolean" | "currency" | "percent" | "action" | "avatar" | "image";
  avatar?: {
    image: string;
    title: string;
    subtitle?: string;
  }
  minWidth?: number;
  align?: "right" | "left" | "center";
  format?: (value: number) => string;
}

export type TableColumns = TableColumn[]