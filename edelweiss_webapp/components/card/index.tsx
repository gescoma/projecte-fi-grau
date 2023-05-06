import styles from "./card.module.css"

export function Card({ children }: { children: React.ReactNode }) {
  return <article className={styles.card}>{children}</article>
}
