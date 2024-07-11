import ResultContainer from "../googleMap/SearchCard"
import { getItinerary } from "@/utils/mongodb"
import ItineraryCard from "./ItineraryCard"

const Itinerary = async ({ session, savedLocations }) => {

    const itinerary = await getItinerary()

    return (
        
       <>
       {itinerary?.map((location, index) => {
            <ItineraryCard id={location.id} name={location.name} address={location.address} description={location.description || "Description not Available"} 
            rating={location.rating || "No ratings yet"} googleMapLink={location.googleMapLink} placeImg={location.placeImg} userRatingCount={location.userRatingCount}
            session={true} />
       })}
       </>
    )
}

export default Itinerary