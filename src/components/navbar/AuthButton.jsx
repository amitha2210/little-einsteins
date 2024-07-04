"use client"
import LoginForm from "../loginForm/LoginForm";
import { useState } from "react"
import close from "@/assets/close.svg"
import Image from "next/image";
import login from "@/assets/login.svg"

const AuthButton = () => {

    const [open, openForm] = useState(false)

    return (
        <>
            <button onClick={() => openForm(true)} className="flex text-white font-bold items-center space-x-1">
                <span>Log in</span>
                <Image src={login} height={28} width={28} alt="login" />
            </button>

            {open && 
            <>
                <LoginForm />
                <button onClick={() => openForm(false)} className="z-10 fixed right-[40rem] top-[13rem]">
                    <Image src={close} alt="close login form"/>
                </button>
                
            </>
            }
        </>
    )
}

export default AuthButton