import { useEffect, useState } from "react";
import { addLocationToItinerary, removeLocationFromItinerary, locationInItineraryByDate, locationInItineraryByTrip } from "@/utils/action";

const DateButton = ({ location, trip, email, date, setAddedToItinerary, setChangeLocation }) => {

    const [inItinerary, setInItinerary] = useState(false)

    useEffect(() => {
        const func = async () => {
            const check = await locationInItineraryByDate(location.id, trip, email, date)
            setInItinerary(check)
        }
        func()
    }, [])

    const addToItinerary = (location, trip, email, date) => {
        const func = async () => {
            const added = await addLocationToItinerary(location, trip, email, date)
            setInItinerary(true)
            setAddedToItinerary(true)
            setChangeLocation(added)
        }
        func()
    }

    const removeFromItinerary = (id, trip, email, date) => {
        const func = async () => {
            const removed = await removeLocationFromItinerary(id, trip, email, date)
            setInItinerary(false)
            
            const check = await locationInItineraryByTrip(id, trip, email)
            setAddedToItinerary(check)

            setChangeLocation(removed)
        }
        func()
    }

  return (
    inItinerary ? 
        <button
            onClick={() => {
                removeFromItinerary(location.id, trip, email, date);
                
            }}
            className="py-1 px-2 bg-slate-300 text-sm mb-4 rounded-lg hover:bg-slate-300/70 hover:shadow-md"
        >
            {date.slice(0, 10)}
        </button>
        :
        <button
            onClick={() => {
                addToItinerary(location, trip, email, date);
            }}
            className="py-1 px-2 bg-slate-100 text-sm mb-4 rounded-lg hover:bg-slate-200 hover:shadow-md"
        >
            {date.slice(0, 10)}
        </button>
  )
}

export default DateButton