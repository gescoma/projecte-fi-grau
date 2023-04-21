"use client"

import { SubmitHandler, useForm } from "react-hook-form"

import { Button } from "@/components/button"
import { Input } from "@/components/input"
import { Logo } from "@/components/logo"
import { signIn } from "next-auth/react"
import styles from "./signIn.module.css"
import { useRouter } from "next/navigation"
import { useState } from "react"

export type Inputs = {
  email: string
  password: string
}

export default function SignInPage() {
  const [error, setError] = useState("")
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setError("")
      const user = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      })
      if (user && !user.ok && user.error) {
        setError(user.error)
        return
      }
      await router.push("/dashboard")
    } catch (e: any) {
      setError(e.message)
    }
  }

  return (
    <>
      <Logo width={300} height={150}></Logo>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input placeholder="Email" name="email" register={register} />
        <Input
          type="password"
          placeholder="Password"
          name="password"
          register={register}
          options={{ required: true }}
        />
        {errors.password && <span>You must enter email and password</span>}
        {error && <span>{error}</span>}
        <a href="#">I forgot my password</a>
        <Button isBoton disabled={isSubmitting}>
          {isSubmitting ? "Loading..." : "Sign In"}
        </Button>
      </form>
    </>
  )
}
