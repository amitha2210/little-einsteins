import React from 'react'
import { auth } from "@/utils/auth/auth"
import Itinerary from '@/components/itinerary/Itinerary'

async function Plan() {
        
    const session = await auth()

    return (
        <div className="flex flex-col w-full items-center justify-center">   
          <Itinerary email={session?.user?.email} />
        </div>    
    )
}

export default Plan
