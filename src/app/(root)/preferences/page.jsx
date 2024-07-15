import React from 'react'
import GoogleMap from "@/components/googleMap/GoogleMap"
import { auth } from "@/utils/auth/auth"
import Dates from '@/components/preferencesPage/calendar/calender'


async function Preferences() {

  const session = await auth()
  
  return (
    <div>
      <Destination session={session}/>
     <Dates />
    </div>
  )
}

export default Preferences

