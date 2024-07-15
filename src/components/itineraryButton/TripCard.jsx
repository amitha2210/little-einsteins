import { useState } from "react"
import DateButton from "./DateButton"
import dropDownArrow from "@/assets/drop-down-arrow.svg"
import dropUpArrow from "@/assets/drop-up-arrow.svg"
import Image from "next/image"

const TripCard = ({ trip, location, email, setAddedToItinerary }) => {
    
    const [showDates, setShowDates] = useState(false)

  return (
    <div className="p-2 w-full">
                            
        <button 
            onClick={() => setShowDates(!showDates)} 
            className="flex text-md py-1 px-2 text-slate-600 rounded-xl border border-slate-300 shadow-sm"
        >
            {trip.trip}
            <Image src={showDates ? dropUpArrow : dropDownArrow} height={24} width={24} alt="show dates" />
        </button>

        <div className={`${showDates ? "" : "hidden"} mt-4 py-1 flex flex-wrap space-x-3`}>
            {trip?.days?.map((day, index) => (
                <DateButton 
                    key={index} 
                    location={location}
                    trip={trip.trip} 
                    email={email} 
                    date={day.date}
                    setAddedToItinerary={setAddedToItinerary}
                />
            ))}
        </div>
    </div>
  )
}

export default TripCard