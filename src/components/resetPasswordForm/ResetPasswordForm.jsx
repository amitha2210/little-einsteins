"use client"
import { resetPassword } from "@/utils/resetPassword/resetPassword"
import styles from "./ResetPasswordForm.module.css"
import { useFormState } from "react-dom"
import { useSearchParams } from "next/navigation"
import { useState, useTransition } from "react"
 
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
        <div className="flex h-screen flex-col justify-center items-center" >          
            <div className="p-5 text-xl">
                RESET PASSWORD
            </div>
            
            <form action={formAction} className={styles.form}>
                <input type="password" placeholder="Password" name="password" required />
                <input type="password" placeholder="Enter Password Again" name="passwordAgain" required />
                <button type="submit">Reset Password</button>
                {state?.error}
                {state?.success}  
            </form>
        </div>
    )
}

export default ResetPasswordForm