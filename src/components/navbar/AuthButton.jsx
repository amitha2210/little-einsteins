"use client"
import { useState } from "react"
import Image from "next/image";
import login from "@/assets/navbar/login.svg"
import LoginForm from "../loginForm/LoginForm";

const AuthButton = () => {

    const [open, openForm] = useState(false)

    return (
        <>
            <button onClick={() => openForm(true)} className="flex text-white font-bold items-center space-x-1">
                <span>Log in</span>
                <Image src={login} height={28} width={28} alt="login" />
            </button>

            {open && 
            <div className="relative">
                <LoginForm openForm={openForm}/>
            </div>
            }
        </>
    )
}

export default AuthButton