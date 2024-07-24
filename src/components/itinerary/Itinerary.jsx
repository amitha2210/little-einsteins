"use client"
import { getSavedLocations, getTrips } from "@/utils/action"
import ItineraryCard from "./ItineraryCard"
import { useState, useEffect } from "react"
import TripDetails from "./TripDetails"
import SearchCard from "../googleMap/SearchCard"

const Itinerary = ({ email, session }) => {

    const [trips, setTrips] = useState(null)
    const [showTripDetails, setShowTripDetails] = useState(null)
    const [savedLocations, setSavedLocations] = useState(null)
    const [changeLocation, setChangeLocation] = useState(null)

    useEffect(() => {
        const func = async () => {
            const db = await getTrips(email)
            console.log(db)
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
        <>
            <div className="flex flex-wrap w-full justify-center px-10 gap-x-10 gap-y-7">
                {trips?.map((dest, index) => (
                    <div 
                        key={index} 
                        className={
                            `w-[20rem] border-[0.5px] border-[#2a98ae] rounded-2xl shadow-md
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
            </div>
            <div className="w-full h-full flex mt-10 border-t">
                {showTripDetails &&
                    <TripDetails 
                        email={email}
                        trip={showTripDetails}
                        selectedTrip={showTripDetails}
                        setChangeLocation={setChangeLocation}
                    />
                }
                <div className="sticky top-[6rem] w-9/12 h-[calc(100vh-7rem)] border-l overflow-auto scrollbar-none">
                    <h1 className="z-10 sticky flex top-0 py-6 w-full bg-[#ecfcff] text-2xl font-bold text-[#00b4d8] justify-center">
                        Saved places
                    </h1>
                    <div className="w-full flex flex-col px-6 items-center justify-center">
                        {savedLocations?.map((location, index) => (
                            <div key={index} className="text-slate-600 flex w-full min-w-[30rem] justify-center">
                                <SearchCard 
                                    id={location.id} 
                                    name={location.name} 
                                    address={location.address} 
                                    description={location.description || "Description not Available"} 
                                    rating={location.rating || "No ratings yet"} 
                                    googleMapLink={location.googleMapLink} 
                                    placeImg={location.placeImg} 
                                    userRatingCount={location.userRatingCount}
                                    regularOpeningHours={location.regularOpeningHours}
                                    session={session}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Itinerary