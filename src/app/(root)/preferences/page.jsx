import React from 'react'
import GoogleMap from "@/components/googleMap/GoogleMap"
import { auth } from "@/utils/auth/auth"
import Preferences from '@/components/preferencesPage/preferences'


async function preferencesPage() {

  const session = await auth()
  
  return (
    <div>
      <Preferences />
    </div>
  )
}

export default preferencesPage

