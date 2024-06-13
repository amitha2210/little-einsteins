import generateText from "@/utils/gemini2"
import { useFormState } from "react-dom"

function Gemini() {
    const [state, formAction] = useFormState(generateText, "")

    return (

        <form action={formAction} >
            <input type="text" placeholder="Input prompt" name="prompt" required />
            <button type="submit">Submit</button>
            {state}           
        </form>
    )
   
}

export default Gemini
