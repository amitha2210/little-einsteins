"use client"
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { verifyEmail } from "@/utils/emailVerification/verifyEmail"

const Verification = () => {
    
    const searchParams = useSearchParams()
    const token = searchParams.get("token")

    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const onSubmit = useCallback(() => {
        if (!token) {
            setError("Missing token!")
            return
        }
        verifyEmail(token)
        .then((data) => {
            setSuccess(data.success)
            setError(data.error)
        })
        .catch(() => {
            setError("Something went wrong!")
        })
    }, [token, success, error])

    useEffect(() => {
        onSubmit()
    }, [onSubmit])

    return (
        <div className="mt-[8rem]">
            Verify email
            {success}
            {error}
        </div>
    )
}

export default Verification