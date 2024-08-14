"use client"
import React from 'react'
//import { auth } from "@/utils/auth/auth"
import Preferences from '@/components/preferencesPage/preferences'
import generateText from "@/utils/gemini2"
import { useFormState } from "react-dom"

function Plan() {
    async function plan2() {
        const [state, formAction] = useFormState(generateText, "")
        const session = await auth()

        return (
            <div>
                <div>
                    <Preferences session={session}/>
                </div>
            </div>      
        )
    }
}

export default Plan
