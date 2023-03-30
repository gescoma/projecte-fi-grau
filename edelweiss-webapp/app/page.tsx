import { Card } from '@/components/card'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import { Button } from '@/components/button'
import { Avatar } from '@/components/avatar'
import { Input } from '@/components/input'
import { Logo } from '@/components/logo'

const inter = Inter({ subsets: ['latin'] })

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
