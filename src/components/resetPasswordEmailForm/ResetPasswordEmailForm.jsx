"use client"
import { resetPasswordEmail } from "@/utils/resetPassword/resetPassword"
import styles from "./ResetPasswordEmailForm.module.css"
import { useFormState } from "react-dom"
import ErrorMessage from "../ErrorMessage"
import Image from "next/image"
import mail from "@/assets/mail.svg"
import send from "@/assets/send.svg"

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