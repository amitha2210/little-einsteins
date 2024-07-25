"use client"
import { login } from "@/utils/action"
import styles from "./LoginForm.module.css"
import Link from "next/link"
import Image from "next/image"
import { useFormState } from "react-dom"
import { handleGoogleLogin } from "@/utils/action"
import google from "@/assets/google.svg"
import ErrorMessage from "../ErrorMessage"
import close from "@/assets/close.svg"
import app from "@/assets/app.svg"
import { useState } from "react"

function LoginForm({ loginPage, openForm }) {

    const [state, formAction] = useFormState(login, null)

    return (
        <>
            {open &&
            <div className={`size-full flex flex-col justify-center items-center 
            ${loginPage ? "" : "fixed bottom-0 right-0 h-screen w-screen bg-black/40"}`} >          
                <div className={loginPage ? styles.containerPage : styles.container}>
                    {openForm &&
                        <button onClick={() => openForm(false)} className="absolute top-4 right-4">
                            <Image src={close} alt="close login form"/>
                        </button>
                    }
                    <Link href="/home" className="flex">
                        <Image src={app} alt="App icon" className="relative right-3"/>
                        
                        <span className="text-xl font-semibold">
                            Sign in to <i>AppName</i>
                        </span>
                    </Link>
                    
                    <form action={formAction} className={styles.form}>
                        
                        <input type="text" placeholder="Username" name="username" required />
                        <input type="password" placeholder="Password" name="password" required />
                        
                        <Link href="/reset-email" className="flex w-4/5 pl-2 text-sm hover:underline">
                            Forgot Password?
                        </Link>
                        
                        <button type="submit">Login</button>
                        
                        <ErrorMessage message={state?.error}/>
                        
                        <Link href="/register" className="mt-3">
                            Don't have an Account? <b>Register</b>
                        </Link>

                    </form>
                    
                    <span className={styles.span}>OR</span>
                    
                    <form className="flex flex-row p-3 w-4/5 justify-center border border-slate-500 rounded-3xl" 
                    action={handleGoogleLogin}>
                        <Image src={google} width={25} height={25} alt="login with google" className="relative right-10"/>
                        <button type="submit">Sign in with Google</button>
                    </form>
                </div>    
            </div>}
        </>
    )
}

export default LoginForm