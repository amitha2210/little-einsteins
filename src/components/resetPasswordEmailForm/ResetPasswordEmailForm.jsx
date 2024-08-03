"use client"
import { useFormState } from "react-dom"
import Image from "next/image"
import mail from "@/assets/auth/mail.svg"
import send from "@/assets/auth/send.svg"
import styles from "./ResetPasswordEmailForm.module.css"
import { resetPasswordEmail } from "@/utils/resetPassword/resetPassword"
import ErrorMessage from "../ErrorMessage"

function ResetPasswordEmailForm() {

    const [state, formAction] = useFormState(resetPasswordEmail, null)

    return (
        <div className="flex h-screen flex-col justify-center items-center gap-[40px]" >          
            <div className="flex">
                <Image src={mail} alt="send email" className="relative right-3"/>
                <p className="text-xl font-semibold">
                    Enter email to reset password 
                </p>
            </div>
            
            
            <form action={formAction} className={styles.form}>
                
                <input type="email" placeholder="Email" name="email" required />
                
                <ErrorMessage message={state?.error || state?.success} />
                
                <button type="submit" className="flex justify-center">
                    Send Reset Email
                    <Image src={send} alt="send email" className="relative left-3"/>
                </button>

            </form>
            
            
        </div>
    )
}

export default ResetPasswordEmailForm