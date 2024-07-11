import GoogleMap from "@/components/googleMap/GoogleMap"
import { auth } from "@/utils/auth/auth"


export default async function Explore() {
  
  const session = await auth()

  return (

    <div className="relative flex flex-col w-full">
      <GoogleMap session={session}/>
    </div>

  )
}