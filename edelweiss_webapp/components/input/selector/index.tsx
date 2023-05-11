import { FiChevronDown } from "react-icons/fi"
import styles from "./select.module.css"
import { useState } from "react"

export function Select({
  defaultValue,
  options,
  onChange,
  minWidth = 180,
  maxWidth = 180,
}: {
  defaultValue: string
  options: { label: string; value: string }[]
  onChange: (value: string) => void
  minWidth?: number
  maxWidth?: number
}) {
  const [selected, setSelected] = useState<any>(defaultValue)
  const [selectOpen, setSelectOpen] = useState(false)

  const handleSelect = (value: string, label: string) => {
    setSelected(label)
    onChange(value)
    setSelectOpen(false)
  }

  return (
    <div
      className={styles.container}
      style={{ minWidth: minWidth, maxWidth: maxWidth }}
    >
      <div
        className={`${styles.input} ${selectOpen && styles.open}`}
        onClick={() => setSelectOpen(!selectOpen)}
      >
        <div className={styles.label}>
          {typeof selected === "string" ? selected : selected({})}
          <FiChevronDown
            className={`${styles.caret} ${selectOpen && styles.turnCaret}`}
          />
        </div>
      </div>
      {selectOpen && (
        <div className={styles.optionsContainer}>
          <div className={styles.options}>
            {options.map(({ value, label }) => (
              <div
                className={styles.value}
                key={value}
                onClick={() => handleSelect(value, label)}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
