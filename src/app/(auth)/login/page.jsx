"use client"
import { login } from "@/utils/action"
import styles from "./login.module.css"
import Link from "next/link"
import { useFormState } from "react-dom"
import { handleGoogleLogin } from "@/utils/action"

function Login() {

    const [state, formAction] = useFormState(login, null)

    return (
        <div className="flex h-screen flex-col justify-center items-center" >          
            <div className="p-5 text-xl">
                LOGIN TO ACCOUNT
            </div>
            
            <form action={formAction} className={styles.form}>
                <input type="text" placeholder="Username" name="username" required />
                <input type="password" placeholder="Password" name="password" required />
                <button type="submit">Login</button>
                {state?.error}
                <Link href="/register">
                    Don't have an Account? <b>Register</b>
                </Link>  
            </form>
            
            <form className="mt-[4rem] p-5 border border-slate-700 rounded-lg"
      action={handleGoogleLogin}
    >
      <button type="submit">Sign in with Google</button>
    </form>
        </div>
    )
}

export default Login