import { useState, useEffect } from "react"
import { useFormState } from "react-dom"
import Image from "next/image"
import { DateRangePicker } from 'rsuite';
import 'rsuite/DateRangePicker/styles/index.css';
import { createItinerary } from "@/utils/action";

const CreateItinerary = ({ email, setTrips, setOpenCreateMenu, setShowTripDetails }) => {

    const [selectedDates, setSelectedDates] = useState(null)
    const [created, createNewItinerary] = useFormState(createItinerary.bind(null, email, selectedDates), null)

    useEffect(() => {
        if (created) {
            setOpenCreateMenu(false)
            setTrips(created.trips)
            const trip = created.trips?.find(trip => trip.trip == created.tripName)
            console.log(trip)
            setShowTripDetails(trip) 
        }
    }, [created])

    
  
  return (
    <div className="p-5 space-y-4">
        <div className="space-y-1">
            <p className="">Select Trip dates:</p>
            <DateRangePicker 
                format="dd-MM-yyyy"
                editable={true}
                size="sm"
                cleanable={true}
                placement="bottomStart"
                onOk={(selectedDates) => setSelectedDates(selectedDates)}
            />
        </div>
        <form 
            action={createNewItinerary}
            className="flex flex-col mt-3"
        >
            <p className="mb-1">Trip Name:</p>
            <input type="text" name="tripName" placeholder="Tokyo" required />
            <button className="mt-4 p-2 bg-[#00b4d8] text-white font-semibold shadow-lg rounded-xl hover:bg-[#00b4d8]/90">
                create new itinerary
            </button>
        </form>
    </div>
  )
}

export default CreateItinerary