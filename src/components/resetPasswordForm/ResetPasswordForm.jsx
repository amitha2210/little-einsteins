"use client"
import { resetPassword } from "@/utils/resetPassword/resetPassword"
import styles from "./ResetPasswordForm.module.css"
import { useFormState } from "react-dom"
import { useSearchParams } from "next/navigation"
import { useState, useTransition } from "react"
import ErrorMessage from "../ErrorMessage"
import Image from "next/image"
import password from "@/assets/password.svg"
import Link from "next/link"
 
function ResetPasswordForm() {

    const searchParams = useSearchParams()
    const token = searchParams.get("token")
    const [state, formAction] = useFormState(resetPassword.bind(null, token), null)
   
    return (
        <div className="flex h-screen flex-col justify-center items-center gap-[40px]" >          
            <div className="flex">
                <Image src={password} alt="reset password" className="relative right-3"/> 
                <span className="text-xl font-semibold">
                    Reset Password
                </span>
            </div>
                     
            <form action={formAction} className={styles.form}>
                <input type="password" placeholder="Password" name="password" required />
                <input type="password" placeholder="Enter Password Again" name="passwordAgain" required />
                
                <ErrorMessage message={state?.error || state?.success} />

                {state?.success &&
                    <Link href="/login" className="bg-slate-100 p-2 px-4 rounded-lg font-medium hover:bg-slate-300">
                        Back to Login
                    </Link>
                }
                
                <button type="submit">Reset Password</button>
 
            </form>
        </div>
    )
}

export default ResetPasswordForm