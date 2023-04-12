import Image from "next/image"
import styles from "./auth.module.css"

export default function Auth({ children }: { children: React.ReactNode }) {
  return (
    <main className={styles.main}>
      <div className={styles.image}>
        <Image
          src={`${process.env.CURRENT_DOMAIN}/images/backgrounds/authBackground.jpg`}
          alt="background for login page, two persons happy for a recent deal"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className={styles.form}>
        <div>{children}</div>
      </div>
    </main>
  )
}
