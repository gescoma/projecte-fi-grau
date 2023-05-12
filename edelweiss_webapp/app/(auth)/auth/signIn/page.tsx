"use client"

import { SubmitHandler, useForm } from "react-hook-form"

import { Button } from "@/components/button"
import { Input } from "@/components/input"
import { Logo } from "@/components/logo"
import styles from "./signIn.module.css"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useSupabase } from "@/context/AuthContext"

export type Inputs = {
  email: string
  password: string
}

export default function SignInPage() {
  const [error, setError] = useState<string | undefined>(undefined)
  const { supabase, session } = useSupabase()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setError(undefined)
      const { data: loginData, error } = await supabase.auth.signInWithPassword(
        {
          email: data.email,
          password: data.password,
        }
      )
      if (error) {
        setError(error.message)
        return
      }
      console.log(loginData)
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
        <Button disabled={isSubmitting}>
          {isSubmitting ? "Loading..." : "Sign In"}
        </Button>
      </form>
    </>
  )
}
