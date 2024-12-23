"use client"
import Image from "next/image"
import addToItineraryIcon from "@/assets/add-itinerary.svg"
import addedToItineraryIcon from "@/assets/added-itinerary.svg"

import { locationInItinerary } from "@/utils/action"
import { useEffect, useState } from "react"
import ItineraryCalendar from "./ItineraryCalendar"

const ItineraryButton = ({ location, email }) => {

    const [addedToItinerary, setAddedToItinerary] = useState(false)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const func = async () => {
            const check = await locationInItinerary(location.id, email)
            setAddedToItinerary(check)
        }
        func() 
    },[location])

    return (
        <div className="relative">
            <button 
                onClick={() => {setOpen(!open)}}
                className={`${open ? "bg-slate-200": ""} text-xs p-2 rounded-full border border-slate-100 shadow-md hover:bg-slate-100`}
            >
                <Image src={addedToItinerary ? addedToItineraryIcon : addToItineraryIcon } height={20} width={20} alt="add to itinerary" />
            </button> 
                          
            {open && 
                <ItineraryCalendar 
                    open={open} 
                    setOpen={setOpen} 
                    setAddedToItinerary={setAddedToItinerary}  
                    email={email} 
                    location={location}
                />
            }
        </div> 
    )
}

export default ItineraryButton