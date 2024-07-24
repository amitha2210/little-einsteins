"use client"
import { useState } from "react"
import DateButton from "./DateButton"
import dropDownArrow from "@/assets/drop-down-arrow.svg"
import dropUpArrow from "@/assets/drop-up-arrow.svg"
import deleteIcon from "@/assets/delete.svg"
import Image from "next/image"
import { removeTripFromDB } from "@/utils/action"

const TripCard = ({ trip, location, email, setAddedToItinerary, setTrip }) => {
    
    const [showDates, setShowDates] = useState(false)

    function removeTrip(tripName, email) {
        const func = async () => {
            const trips = await removeTripFromDB(tripName, email)
            setTrip(trips)
        }
        func()
    }

  return (
    <div className="p-2 w-full">
        <div className="relative w-[20rem] rounded-xl border p-3 flex items-center text-slate-600 shadow">
            <span className="w-[13rem] text-wrap text-center">
                {trip.trip}
            </span>
            <button 
                onClick={() => setShowDates(!showDates)} 
                className="p-1 rounded-lg shadow-sm ml-3
                    bg-slate-100 hover:bg-slate-200"
            >
                <Image src={showDates ? dropUpArrow : dropDownArrow} height={24} width={24} alt="show dates" />
            </button>
            <button 
                onClick={() => removeTrip(trip.trip, email)}
                className="p-1 ml-5 rounded-lg hover:bg-slate-200"
            >
                <Image src={deleteIcon} height={20} width={20} alt="delete trip" />
            </button>
        </div>
        {showDates &&
            <div className="mt-4 py-1 flex flex-wrap space-x-3">
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
        }
    </div>
  )
}

export default TripCard