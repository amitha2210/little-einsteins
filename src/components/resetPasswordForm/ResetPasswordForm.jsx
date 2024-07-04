"use client"
import { resetPassword } from "@/utils/resetPassword/resetPassword"
import styles from "./ResetPasswordForm.module.css"
import { useFormState } from "react-dom"
import { useSearchParams } from "next/navigation"
import { useState, useTransition } from "react"
import ErrorMessage from "../ErrorMessage"
import Image from "next/image"
import password from "@/assets/password.svg"
 
function ResetPasswordForm() {

    const searchParams = useSearchParams()
    const token = searchParams.get("token")
    const [state, formAction] = useFormState(resetPassword.bind(null, token), null)

    // const [error, setError] = useState("")
    // const [success, setSuccess] = useState("")
    // const [isPending, startTransition] = useTransition()
    // const onSubmit = (formData) => {
    //     console.log(formData)
    //     startTransition(() => {
    //         newPassword(formData, token)
    //         .then((data) => {
    //             setSuccess(data.success)
    //             setError(data.error)
    //         })
    //     }) 
    // }
   
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
                
                <button type="submit">Reset Password</button>
 
            </form>
        </div>
    )
}

export default ResetPasswordForm