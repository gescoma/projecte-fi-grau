import styles from "./card.module.css"

export function Card({
  children,
  clickable = false,
}: {
  children: React.ReactNode
  clickable?: boolean
}) {
  return (
    <article className={`${styles.card} ${clickable && styles.clickable}`}>
      {children}
    </article>
  )
}
