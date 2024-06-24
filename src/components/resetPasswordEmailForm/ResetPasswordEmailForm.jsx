"use client"
import { resetPasswordEmail } from "@/utils/resetPassword/resetPassword"
import styles from "./ResetPasswordEmailForm.module.css"
import { useFormState } from "react-dom"

function ResetPasswordEmailForm() {

    const [state, formAction] = useFormState(resetPasswordEmail, null)

    return (
        <div className="flex h-screen flex-col justify-center items-center" >          
            <div className="p-5 text-xl">
                RESET PASSWORD
            </div>
            
            <form action={formAction} className={styles.form}>
                <input type="text" placeholder="Email" name="email" required />
                <button type="submit">Send Reset Email</button>
                {state?.error || state?.success}  
            </form>
        </div>
    )
}

export default ResetPasswordEmailForm