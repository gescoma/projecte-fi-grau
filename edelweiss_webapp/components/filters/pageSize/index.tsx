import { Select } from "@/components/input/selector"
import styles from "./size.module.css"

export function PageSize({
  pageSize,
  setPageSize,
  total,
}: {
  pageSize: number
  setPageSize: any
  total: number
}) {
  return (
    <div className={styles.container}>
      <span>Mostrando </span>
      <Select
        defaultValue={"10"}
        options={[
          { label: "10", value: "10" },
          { label: "20", value: "20" },
          { label: "30", value: "30" },
          { label: "40", value: "40" },
          { label: "50", value: "50" },
        ]}
        onChange={(value) => setPageSize(Number(value))}
        minWidth={10}
        maxWidth={46}
      />
      <span> de {total} resultados</span>
    </div>
  )
}
