"use client"
import { register } from "@/utils/action"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useFormState } from "react-dom"
import styles from "./RegisterForm.module.css"
import ErrorMessage from "../ErrorMessage"
import app from "@/assets/app.svg"
import Image from "next/image"

function RegisterForm() {

    const [state, formAction] = useFormState(register, null)
    const router = useRouter()

    /*useEffect(() => {
        state?.success && router.push('/')
    }, [state?.success, router])*/

    useEffect(() => {
        state?.success && router.push('/')
    }, [state?.success])

    return (
        <div className="flex flex-col h-screen items-center justify-center gap-[40px]">
            <Link href="/home" className="flex">
                <Image src={app} alt="App icon" className="relative right-3"/>

                <span className="text-xl font-semibold">
                    Sign up for <i>AppName</i>
                </span>
            </Link>
            
            <form action={formAction} className={styles.form} >
                
                <input type="text" placeholder="Username" name="username" required />
                <input type="email" placeholder="Email" name="email" required />
                <input type="password" placeholder="Password" name="password" required />
                <input type="password" placeholder="Enter Password Again" name="passwordAgain" required />

                <button type="submit">Register</button>
                
                <ErrorMessage message={state?.error} />
                
                <Link href="/login" className="mt-3">
                    Have an Account? <b>Login</b>
                </Link>

            </form>
        </div>
    )
}

export default RegisterForm