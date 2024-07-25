"use client"
import Image from "next/image"
import addToItineraryIcon from "@/assets/add-itinerary.svg"
import addedToItineraryIcon from "@/assets/added-itinerary.svg"

import { locationInItineraryByTrip } from "@/utils/action"
import { useEffect, useState } from "react"
import DateButton from "./DateButton"

const AddToItineraryButton = ({ email, location, trip, setChangeLocation }) => {

    const [addedToItinerary, setAddedToItinerary] = useState(false)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        setOpen(false)
        const func = async () => {
            const check = await locationInItineraryByTrip(location.id, trip.trip, email)
            setAddedToItinerary(check)
        }
        func() 
    }, [location, trip])

    return (
        <div className="relative">
            <button 
                onClick={() => {setOpen(!open)}}
                className={`${open ? "bg-slate-200": ""} text-xs p-2 rounded-full border border-slate-100 shadow-md hover:bg-slate-100`}
            >
                <Image 
                    src={addedToItinerary ? addedToItineraryIcon : addToItineraryIcon } 
                    height={20} 
                    width={20} 
                    alt="add to itinerary" 
                />
            </button> 
                          
            {open && 
                <div className="
                    z-10 absolute bottom-14 -left-10 w-[21rem] max-h-[15rem] overflow-y-auto scrollbar-thin p-4 flex flex-wrap 
                    gap-x-3 gap-y-2 justify-center border border-slate-300 bg-white rounded-lg"
                >
                    <h1 className="w-full text-center pb-2 mb-3 font-semibold border-b">ADD TO ITINERARY</h1>
                    {trip.days.map((day, index) => (
                        <DateButton
                            key={index}
                            date={day.date}
                            location={location}
                            trip={trip.trip}
                            email={email}
                            setAddedToItinerary={setAddedToItinerary}
                            setChangeLocation={setChangeLocation}
                        />
                    ))}
                </div>
            }
        </div> 
    )
}

export default AddToItineraryButton