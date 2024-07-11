import { useEffect, useState } from "react";
import { addLocationToItinerary, removeLocationFromItinerary, locationInItineraryByDate } from "@/utils/action";

const DateButton = ({ location, trip, email, date, setAddedToItinerary }) => {

    const [inItinerary, setInItinerary] = useState(false)

    useEffect(() => {
        const func = async () => {
            const check = await locationInItineraryByDate(location.id, trip, email, date)
            setInItinerary(check)
        }
        func()
    }, [location])

    const addToItinerary = (location, trip, email, date) => {
        const func = async () => {
            await addLocationToItinerary(location, trip, email, date)
            setInItinerary(true)
            setAddedToItinerary()
        }
        func()
    }

    const removeFromItinerary = (id, trip, email, date) => {
        const func = async () => {
            await removeLocationFromItinerary(id, trip, email, date)
            setInItinerary(false)
            setAddedToItinerary()
        }
        func()
    }

  return (
    inItinerary ? 
        <button
            onClick={() => {
                removeFromItinerary(location.id, trip, email, date);
                
            }}
            className="py-1 px-2 bg-slate-200 text-sm mb-4 rounded-lg hover:bg-slate-300 hover:shadow-md"
        >
            {date}
        </button>
        :
        <button
            onClick={() => {
                addToItinerary(location, trip, email, date);
            }}
            className="py-1 px-2 bg-slate-100 text-sm mb-4 rounded-lg hover:bg-slate-200 hover:shadow-md"
        >
            {date}
        </button>
  )
}

export default DateButton