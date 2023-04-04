"use client"

import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/button"
import { Input } from '@/components/input'
import { Logo } from '@/components/logo'
import { signIn } from "next-auth/react"
import styles from './signIn.module.css'

export type Inputs = {
  email: string,
  password: string
}

export default function SignIn() {
  const { register, handleSubmit, watch, formState: { errors }} = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = data => {
    const sign = signIn("credentials", {username: data.email, password: data.password})
    console.log(sign)
  }


  return (
    <> 
      <Logo width={300} height={150}></Logo>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input placeholder="Email" name="email" register={register} />
        <Input type="password" placeholder="Password" name="password" register={register} options={{required: true}} />
        {errors.password && <span>You must enter email and password</span>}
        <a href="#">I forgot my password</a>
        <Button isBoton>Log in</Button> 
      </form>
    </>
  )
}