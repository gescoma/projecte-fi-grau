"use client"

import React, { useState } from 'react'

import { Avatar } from '@/components/avatar'
import {BsThreeDots} from "react-icons/bs"
import { Button } from '@/components/button'
import { Card } from '@/components/card'
import Image from 'next/image'
import { Input } from '@/components/input'
import { Inter } from 'next/font/google'
import { Logo } from '@/components/logo'
import { MenuAvatar } from '@/components/menuAvatar'
import styles from './page.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [open, setOpen] = useState(false)
  return (
    <div className={styles.main}>
      <Card > 
      <Logo></Logo>
      <Input>Login</Input>
      <Input>Passwd</Input>     
      <Button isBoton>Enviar</Button>   
      <MenuAvatar>
        <Avatar>1</Avatar>
        {open}
        totalmenteAleatorio@gmail.com
        
        <BsThreeDots onClick={() => setOpen(value=>!value)}/>
        {open && <div>holaaaa</div>}
      </MenuAvatar> 
      </Card>
      

    </div>
  )
}
