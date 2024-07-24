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

      <Itinerary email={email} session={session}/>

      <div className={`w-full mt-6 flex flex-col p-4 items-center justify-center`}>
        {savedLocations?.map((location, index) => (
          <div key={index} className={`text-slate-600 flex w-full min-w-[30rem] justify-center`}>
            <div className={`w-1/2`}>
                <SearchCard 
                  id={location.id} 
                  name={location.name} 
                  address={location.address} 
                  description={location.description || "Description not Available"} 
                  rating={location.rating || "No ratings yet"} 
                  googleMapLink={location.googleMapLink} 
                  placeImg={location.placeImg} 
                  userRatingCount={location.userRatingCount}
                  regularOpeningHours={location.regularOpeningHours}
                  session={session}
                />
            </div>                       
          </div>
        ))}
      </div>
    
    </div>
  )
}