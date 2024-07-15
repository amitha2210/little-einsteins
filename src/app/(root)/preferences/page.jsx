import React from 'react'
import GoogleMap from "@/components/googleMap/GoogleMap"
import { auth } from "@/utils/auth/auth"
import Dates from '@/components/preferencesPage/calendar/calender'
import Destination from '@/components/preferencesPage/destination/destination'
import ActivityType from '@/components/preferencesPage/activityType/activityType'


async function Preferences() {

  const session = await auth()
  
  return (
    <div>
      <Destination session={session}/>
     <Dates />
     <ActivityType />
    </div>
  )
}

export default Preferences

