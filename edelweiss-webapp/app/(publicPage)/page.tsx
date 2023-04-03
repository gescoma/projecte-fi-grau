import { Avatar } from '@/components/avatar'
import { Button } from '@/components/button'
import { Card } from '@/components/card'
import { Input } from '@/components/input'
import { Logo } from '@/components/logo'
import styles from './page.module.css'

export default function Home() {
  return (
    <div className={styles.main}>
      <Card > 
      <Logo></Logo>
      <Input>Login</Input>
      <Input>Passwd</Input>     
      <Button isBoton>Enviar</Button> 
      <Avatar>2</Avatar>    
      </Card>
    </div>
  )
}
