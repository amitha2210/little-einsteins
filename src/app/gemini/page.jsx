"use client"
import generateText from "@/utils/gemini2"
import { useFormState } from "react-dom"

function Gemini() {
    const [state, formAction] = useFormState(generateText, "")

    return (
        <div>
            <form action={formAction} className="mt-[8rem]">
                <input type="text" placeholder="Input prompt" name="prompt" required />
                <button type="submit">Submit</button>
                {state}           
            </form>
        </div>        
    )
   
}

export default Gemini
