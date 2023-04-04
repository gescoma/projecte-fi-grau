"use client"

import styles from './menuAvatar.module.css'
import {Avatar } from '@/components/avatar'
import { MenuUser } from '../menuUser'

export function MenuAvatar () {
  const [open, setOpen] = useState(false)
  return (
    <div className={styles.menuAvatar}>
      <Avatar>2</Avatar>
      <Avatar>1</Avatar>
      {open}
      totalmenteAleatorio@gmail.com
      
      <BsThreeDots onClick={() => setOpen(value=>!value)}/>
      {open && <MenuUser></MenuUser>}
    </div>
  )
}