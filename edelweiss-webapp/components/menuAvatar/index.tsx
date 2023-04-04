import styles from './menuAvatar.module.css'

export function MenuAvatar ({children}) {
  return (
    <div className={styles.menuAvatar}>
      {children}
    </div>
  )
}