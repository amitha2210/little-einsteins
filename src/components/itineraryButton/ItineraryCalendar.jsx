"use client"
import close from "@/assets/close.svg"
import addToItineraryIcon from "@/assets/edit-itinerary.svg"
import createNewItineraryIcon from "@/assets/create-itinerary.svg"
import tripIcon from "@/assets/trip.svg"

import { createItinerary, getTrips } from "@/utils/action"
import { useEffect, useState, useFormStatus } from "react"
import { useFormState } from "react-dom"
import Image from "next/image"
import TripCard from "./TripCard"
import { DateRangePicker } from 'rsuite';
import 'rsuite/DateRangePicker/styles/index.css';

const ItineraryCalendar = ({ open, setOpen, setAddedToItinerary, email, location }) => {
        
    const [trips, setTrips] = useState(null)
    const [selectedDates, setSelectedDates] = useState(null)
    const [showCreateMenu, setShowCreateNewMenu] = useState(false)
    const [loaded, setLoaded] = useState(false)

    const [addedToDB, addToDB] = useFormState(createItinerary.bind(null, email, selectedDates), null)

    useEffect(() => {
        const func = async () => {
            console.log("HERE")
            setSelectedDates(null)
            const trips = await getTrips(email)
            setTrips(trips)
            setLoaded(true)  
        }
        func()
    }, [addedToDB])

  return (
    <>
        {open &&
            <div className="absolute w-[29rem] h-[23rem] left-[3rem] border overflow-hidden pb-16 -top-12 bg-white rounded-3xl shadow-2xl">
                <div className="w-full flex justify-around">
                    <button 
                        onClick={() => setShowCreateNewMenu(false)}
                        className={`${showCreateMenu ? "" : "bg-[#00a4c4]/10"} w-1/2 flex p-3 text-[#0093b1] text-lg font-semibold 
                            items-center justify-center border-b border-[#0093b1]`}
                    >
                        <Image 
                            src={addToItineraryIcon} 
                            height={24} 
                            width={24} 
                            alt="my itinerary" 
                            className="ml-1"
                        />
                    </button>
                    <button 
                        onClick={() => setShowCreateNewMenu(true)}
                        className={`${showCreateMenu ? "bg-[#00a4c4]/10" : ""} w-1/2 flex p-3 text-[#0093b1] text-lg font-semibold 
                            items-center justify-center border-b border-[#0093b1]`}
                    >
                        <Image 
                            src={createNewItineraryIcon} 
                            height={24} 
                            width={24} 
                            alt="create new itinerary" 
                            className="ml-1"
                        />
                    </button>
                </div>
                <div className="flex flex-col p-2 h-full overflow-auto space-y-2">          
                    {showCreateMenu ? 
                        <div className="mt-4 px-2 space-y-6">
                            <div className="z-10 space-y-2">
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
                                action={addToDB}
                                className="flex flex-col mt-3 space-y-2"
                            >
                                <p>Trip Name:</p>
                                <input type="text" name="tripName" placeholder="Tokyo" required className="mb-3"/>
                                {addedToDB && 
                                    <p className="p-1 w-full text-center text-[#0093b1]">
                                        {addedToDB?.message}
                                    </p>
                                }
                                <button className="relative top-2 p-2 bg-[#00b4d8] text-white font-semibold shadow-lg rounded-xl hover:bg-[#00b4d8]/90">
                                    create new itinerary
                                </button>
                            </form>
                        </div>
                        :
                        <>
                            <p className="flex p-1 justify-center items-center w-full text-xl text-slate-600 font-semibold">
                                Itineraries
                                <Image src={tripIcon} height={28} width={28} alt="trip icon" className="ml-1"/>
                            </p>
                            {loaded ?
                                (trips ? 
                                    trips.map((trip, index) => (
                                        <TripCard 
                                            key={index} 
                                            trip={trip} 
                                            location={location} 
                                            email={email}
                                            setAddedToItinerary={setAddedToItinerary}
                                            setTrip={setTrips} 
                                        />
                                    ))
                                    :
                                    <div className="flex flex-col items-center text-center text-[#0093b1] space-y-8">
                                        <span className="p-2 text-lg mt-5">
                                            No Trips Planned
                                        </span>
                                        <button 
                                            onClick={() => setShowCreateNewMenu(true)}
                                            className="bg-[#00b4d8] text-white font-semibold w-fit p-2 px-3 rounded-lg hover:bg-[#0093b1]"
                                        >
                                            Plan new Trip
                                        </button>
                                    </div>
                                )
                                :
                                <div>
                                    Getting Trips...
                                </div>
                            }
                        </>    
                    } 
                </div>
            </div>
        }
    </>
  )
}

export default ItineraryCalendar