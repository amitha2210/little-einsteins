"use client"
import close from "@/assets/close.svg"

import { createItinerary, getTrips } from "@/utils/action"
import { useEffect, useState } from "react"
import { useFormState } from "react-dom"
import Image from "next/image"
import TripCard from "./TripCard"
import { DateRangePicker } from 'rsuite';
import 'rsuite/DateRangePicker/styles/index.css';

const ItineraryCalendar = ({ open, setOpen, setAddedToItinerary, email, location }) => {
        
    const [trips, setTrips] = useState(null)
    const [selectedDates, setSelectedDates] = useState(null)
    const [addedToDB, addToDB] = useFormState(createItinerary.bind(null, email, selectedDates), null)

    useEffect(() => {
        const func = async () => {
            const trips = await getTrips(email)
            setTrips(trips)
        }
        func()  
    }, [addedToDB])

  return (
    <>
        {open &&
            <div className="flex flex-col size-full overflow-auto space-y-2">
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
                
                <span 
                    className="flex w-full
                    before:w-full before:mr-5 before:m-auto before:border before:border-slate-600 
                    after:w-full after:ml-5 after:m-auto after:border after:border-slate-600"
                >
                    or
                </span>
                <div className="p-1 py-3 z-10">
                    <p className="p-1">Select Trip dates:</p>
                    <DateRangePicker 
                        format="dd-MM-yyyy"
                        editable={true}
                        size="sm"
                        placement="bottomStart"
                        onOk={(selectedDates) => setSelectedDates(selectedDates)}
                    />
                </div>
                <form 
                    action={addToDB} 
                    className="flex flex-col p-2 space-y-2"
                >
                    <p>Trip Name:</p>
                    <input type="text" name="tripName" placeholder="Tokyo" required/>
                    {addedToDB && 
                        <p className="p-3 w-full text-center text-blue-400">
                            {addedToDB}
                        </p>
                    }
                    <button className="p-2 bg-[#00b4d8] text-white font-semibold shadow-lg rounded-xl hover:bg-[#00b4d8]/90">
                        create new itinerary
                    </button>
                    
                </form>
                

                
                
            </div>
        }
    </>
  )
}

export default ItineraryCalendar