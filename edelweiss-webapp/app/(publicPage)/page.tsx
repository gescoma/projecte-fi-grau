import { Avatar } from "@/components/avatar"
import { Button } from "@/components/button"
import { Card } from "@/components/card"
import { Logo } from "@/components/logo"
import styles from "./page.module.css"

export default function Home() {
  return (
    <div className={styles.main}>
      <Card>
        <Logo width={300} height={150} />
        <Button isBoton>Enviar</Button>
        <Avatar>2</Avatar>
      </Card>
    </div>
  )
}
