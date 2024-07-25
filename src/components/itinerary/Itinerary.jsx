"use client"
import { getSavedLocations, getTrips } from "@/utils/action"
import ItineraryCard from "./ItineraryCard"
import { useState, useEffect } from "react"
import TripDetails from "./TripDetails"
import SavedPlacesCard from "./savedPlaces/SavedPlacesCard"
import bg from "@/assets/travelbg.jpg"
import Image from "next/image"
import CreateItinerary from "./CreateItinerary"
import addIcon from "@/assets/add.svg"
import Link from "next/link"

const Itinerary = ({ email, session }) => {

    const [trips, setTrips] = useState(null)
    const [showTripDetails, setShowTripDetails] = useState(null)
    const [savedLocations, setSavedLocations] = useState(null)
    const [changeLocation, setChangeLocation] = useState(null)
    const [openCreateMenu, setOpenCreateMenu] = useState(false)

    useEffect(() => {
        const func = async () => {
            const db = await getTrips(email)
            setTrips(db)
            setShowTripDetails(db?.[0])            
        }
        func()    
    }, [email])

    useEffect(() => {
        const func = async () => {
            const saved = await getSavedLocations(email)
            setSavedLocations(saved)
        }
        func()    
    }, [email])

    useEffect(() => {
        const func = async () => {
            const db = await getTrips(email)
            setTrips(db)
            const trip = db.find(trip => trip.trip == changeLocation?.trip)
            setShowTripDetails(trip) 
        }
        
        if (changeLocation) {
            func()
        }  
    }, [changeLocation])

    return (
        <div className="w-full">
            <div className="relative flex flex-wrap w-full min-h-[20rem] items-center justify-center p-10 pt-28 pb-14 gap-x-10 gap-y-7">
                <div className="absolute top-5 flex items-center justify-center">
                    <p className="p-3 px-6 bg-white text-3xl font-semibold text-slate-600
                        shadow-2xl rounded-md">
                        My Trips
                    </p>
                    <button 
                        onClick={() => { setOpenCreateMenu(!openCreateMenu) }}
                        className="bg-[#00b4d8] p-3 rounded-md ml-7 shadow-sm hover:bg-[#00b4d8]/80">
                        <Image src={addIcon} height={28} width={28} alt="create new trip" />
                    </button>
                    
                </div>
                
                {!trips?.[0] &&
                    <p className="text-2xl font-semibold text-white bg-[#00b4d8]/90 p-4 rounded-xl">
                        No Trips Planned
                    </p>
                }

                <Image 
                    src={bg} 
                    fill
                    objectFit="cover"
                    style={{ opacity: "35%", backgroundPosition: "bottom" }}
                    className="-z-50"
                    alt="background"
                />
                {trips?.map((dest, index) => (
                    <div 
                        key={index} 
                        className={
                            `w-[20rem] border-[0.5px] bg-white border-[#2a98ae] rounded-2xl shadow-md
                            ${showTripDetails == null 
                                ? "" 
                                : dest.trip == showTripDetails.trip 
                                ? "shadow-xl" 
                                : "opacity-65"
                            }`
                        }
                    >
                        <ItineraryCard 
                            email={email}
                            trip={dest}
                            setShowTripDetails={setShowTripDetails}
                        />
                    </div>
                ))}
                {openCreateMenu &&
                    <div className="absolute top-[5.5rem] bg-white border border-slate-300 rounded-lg shadow-lg">
                        <CreateItinerary 
                            email={email}
                            setTrips={setTrips}
                            setOpenCreateMenu={setOpenCreateMenu}
                            setShowTripDetails={setShowTripDetails}
                        />
                    </div>
                }
            </div>
            
            <div className="w-full h-full flex">
                {showTripDetails &&
                    <div className="w-full pb-10">
                            <TripDetails 
                                email={email}
                                trip={showTripDetails}
                                selectedTrip={showTripDetails}
                                setChangeLocation={setChangeLocation}
                                setTrips={setTrips}
                                setShowTripDetails={setShowTripDetails}
                            />
                    </div>
                }
                <div className={`${showTripDetails ? "sticky top-[6rem] w-9/12 h-[calc(100vh-6.5rem)] border-l overflow-auto scrollbar-none": "w-full" }`}>
                    <div className={`${showTripDetails ? "sticky z-50 flex top-0" : ""} w-full flex justify-center`}>
                        <h1 className={`${showTripDetails ? "flex py-6 w-full text-2xl bg-[#ecfcff]" : "my-3 p-3 text-3xl border-b border-[#00b4d8]"} 
                            font-bold text-[#00b4d8] justify-center`}
                        >
                            Saved places
                        </h1>
                    </div>
                    {savedLocations?.length > 0 ? 
                        <div className={`${showTripDetails ? "w-full flex flex-col items-center justify-center" : "flex flex-wrap items-center justify-center gap-8"} px-8 py-5 `}>
                            {savedLocations?.map((location, index) => (
                                <div key={index} className={`${showTripDetails ? "w-full" :" w-5/12" } text-slate-600 flex min-w-[30rem] justify-center`}>
                                    <SavedPlacesCard
                                        email={email} 
                                        location={location}
                                        selectedTrip={showTripDetails}
                                        setChangeLocation={setChangeLocation}
                                    />
                                </div>
                            ))}
                        </div>
                        :
                        <div className="w-full flex justify-center">
                            <Link href="/explore" className="mt-6 p-3 px-8 bg-[#00b4d8] rounded-full text-2xl text-white font-semibold hover:bg-[#00b4d8]/80">
                                Explore
                            </Link>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Itinerary