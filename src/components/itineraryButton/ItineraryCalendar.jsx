"use client"
import close from "@/assets/close.svg"

import { createItinerary, getTrips } from "@/utils/action"
import { useEffect, useState } from "react"
import Image from "next/image"
import TripCard from "./TripCard"

const ItineraryCalendar = ({ open, setOpen, setAddedToItinerary, email, location }) => {
    
    const [trips, setTrips] = useState(null)
    const [createdNewItinerary, setCreatedNewItinerary] = useState(false)

    useEffect(() => {
        const func = async () => {
            const trips = await getTrips(email)
            setTrips(trips)

        }
        func()  
    }, [createdNewItinerary])

  return (
    <>
        {open &&
            <div className="fixed flex h-screen w-screen top-0 right-0 items-center justify-center z-50">
                <div className="relative flex flex-col w-5/12 h-2/6 overflow-auto p-3 bg-white border-4 border-slate-100 shadow-lg rounded-3xl space-y-1 items-center">
                    
                    <button 
                        onClick={() => setOpen(false)}
                        className="absolute top-3 right-3 p-1.5 border border-slate-300 rounded-full shadow-xl"
                    >
                        <Image src={close} height={20} width={20} alt="close menu" />
                    </button>
                    
                    {trips?.map((trip, index) => (
                        <TripCard 
                            key={index} 
                            trip={trip} 
                            location={location} 
                            email={email}
                            setAddedToItinerary={setAddedToItinerary} 
                        />
                    ))}

                    <button 
                        onClick={() => {createItinerary(email); setCreatedNewItinerary(!createdNewItinerary)} } 
                        className="p-2 bg-[#00b4d8] text-white font-semibold shadow-lg rounded-xl hover:bg-[#00b4d8]/90"
                    >
                        create new itinerary
                    </button>
                </div>
            </div>
        }
    </>
  )
}

export default ItineraryCalendar