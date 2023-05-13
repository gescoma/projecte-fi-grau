import { FiChevronDown } from "react-icons/fi"
import styles from "./select.module.css"
import { useClickOutside } from "@/hooks/useClickOutsideRef"
import { useState } from "react"

export function Select({
  defaultValue,
  options,
  onChange,
  minWidth = "10rem",
  maxWidth = "10rem",
}: {
  defaultValue: string
  options: { label: string; value: string }[]
  onChange: (value: string) => void
  minWidth?: string
  maxWidth?: string
}) {
  const [selected, setSelected] = useState<any>(defaultValue)
  const { isOpenRef, handleClose, isOpen } = useClickOutside<HTMLDivElement>()

  const handleSelect = (value: string, label: string) => {
    setSelected(label)
    onChange(value)
    handleClose()
  }

  return (
    <div
      className={styles.container}
      style={{ minWidth: minWidth, maxWidth: maxWidth }}
      ref={isOpenRef}
    >
      <div
        className={`${styles.input} ${isOpen && styles.open}`}
        onClick={handleClose}
      >
        <div className={styles.label}>
          {selected}
          <FiChevronDown
            className={`${styles.caret} ${isOpen && styles.turnCaret}`}
          />
        </div>
      </div>
      {isOpen && (
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
