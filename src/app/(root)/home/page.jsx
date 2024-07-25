import { auth } from "@/utils/auth/auth"
import { getSavedLocations } from "@/utils/mongodb"
import SearchCard from "@/components/googleMap/SearchCard"
import Itinerary from "@/components/itinerary/Itinerary"

export default async function Home() {

  const session = await auth()
  const email = session?.user?.email
  const savedLocations = await getSavedLocations(email)
  
  return (
    <div className="flex flex-col w-full items-center justify-center">
      <p className="p-3 mt-4 text-2xl text-[#00b4d8] font-semibold">{email} 's Homepage</p>

      {email ?
        <Itinerary email={email} session={session}/>
        :
        <div>
          Not signed in 
        </div>
      }
    
    </div>
  )
}