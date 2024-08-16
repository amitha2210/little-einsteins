import React from 'react'
import { auth } from "@/utils/auth/auth"
import Preferences from '@/components/preferencesPage/preferences'

async function Plan() {
        
    const session = await auth()

    return (
        <div>
            <div>
                <Preferences session={session}/>
            </div>
        </div>      
    )
    
}

export default Plan
