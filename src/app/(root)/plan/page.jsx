"use client"
import React from 'react'
//import { auth } from "@/utils/auth/auth"
import Preferences from '@/components/preferencesPage/preferences'
import generateText from "@/utils/gemini2"
import { useFormState } from "react-dom"

function Plan() {
    const [state, formAction] = useFormState(generateText, "")

    return (
        <div>
            <div>
                <Preferences />
            </div>
        </div>      
    )
   
}

export default Plan
