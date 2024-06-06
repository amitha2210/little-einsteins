"use client"
import { register } from "@/utils/action"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useFormState } from "react-dom"
import styles from "./register.module.css"

function Register() {

    const [state, formAction] = useFormState(register, null)
    const router = useRouter()

    /*useEffect(() => {
        state?.success && router.push('/')
    }, [state?.success, router])*/

    useEffect(() => {
        state?.success && router.push('/')
    }, [state?.success])

    return (
        <div className="flex flex-col h-screen items-center justify-center">
            <div className="p-5 text-xl">
                CREATE ACCOUNT
            </div>
            <form action={formAction} className={styles.form} >
                <input type="text" placeholder="Username" name="username" required />
                <input type="email" placeholder="Email" name="email" required />
                <input type="password" placeholder="Password" name="password" required />
                <input type="password" placeholder="Enter Password Again" name="passwordAgain" required />

                <button type="submit">Register</button>
                {state?.error}
                <Link href="/login">
                    Have an Account? <b>Login</b>
                </Link>                
            </form>
        </div>
    )
}

export default Register