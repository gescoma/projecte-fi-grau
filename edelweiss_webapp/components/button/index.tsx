import styles from "./button.module.css"

export function Button({ children, isBoton, disabled = false }) {
  if (isBoton) {
    return (
      <button className={styles.button} disabled={disabled}>
        {children}
      </button>
    )
  }

  return (
    <a className={styles.button} href="menu.html">
      {children}
    </a>
  )
}
