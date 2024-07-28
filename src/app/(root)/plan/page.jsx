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
            <div> <pre className="overflow-x-auto whitespace-pre-wrap">
                <form action={formAction} className="mt-[8rem]">
                    <input type="text" placeholder="Input prompt" name="prompt" required />
                    <button type="submit">Submit</button>
                    {state}           
                </form> 
                </pre>
            </div>  
        </div>      
    )
   
}

export default Plan
