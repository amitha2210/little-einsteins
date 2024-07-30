"use client"
import { useEffect, useState } from "react"
import LocationCard from "./LocationCard"
import { Element, scroller } from "react-scroll"
import { removeTripFromDB } from "@/utils/action"
import deleteIcon from "@/assets/delete.svg"
import Image from "next/image"
import savedPlacesIcon from "@/assets/saved-places.svg"
import searchIcon from "@/assets/search.svg"
import mapIcon from "@/assets/map.svg"
import mapIconColoured from "@/assets/map-coloured.svg"
import pinonmap from "@/assets/pinonmap.svg"

function formatDate(date) {
    const num = date.slice(8, 10)
    const month = date.slice(4, 7)
    let day = date.slice(0, 3)
    if (day == "Mon") {
        day = "Monday"
    } else if (day == "Tue") {
        day = "Tuesday"
    } else if (day == "Wed") {
        day = "Wednesday"
    } else if (day == "Thu") {
        day = "Thursday"
    } else if (day == "Fri") {
        day = "Friday"
    } else if (day == "Sat") {
        day = "Saturday"
    }  else {
        day = "Sunday"
    }
    return day + ", " + num + " " + month 
}

const TripDetails = ({ email, trip, setChangeLocation, setTrips, setShowTripDetails, showMap, setShowMap, setShowSavedPlaces }) => {

    const [scrollToDate, setScrollToDate] = useState(null)
    
    const removeTrip = () => {
        const func = async () => {
            const updatedTrips = await removeTripFromDB(trip.trip, email)
            setTrips(updatedTrips)
            setShowTripDetails(updatedTrips?.[0])            
        }
        func() 
    }

    useEffect(() => {
        setScrollToDate(trip.days?.[0].date)
    }, [trip])

  return (
    <div className="pb-10">
        <div className="z-10 w-full sticky top-[6rem] flex p-6 bg-white text-4xl font-bold text-[#00738a]">
            Trip to {trip.trip}
            <button
                className="ml-6 p-2 bg-slate-50 rounded-md hover:bg-slate-200"
                onClick={() => { setShowMap(true); setShowSavedPlaces(false) }}
            >
                <Image src={pinonmap} height={24} width={24} alt="map" />
            </button>
            
            <button 
                onClick={() => removeTrip()}
                className="ml-4 p-2 rounded-lg bg-slate-100 hover:bg-slate-200"
            >
                <Image src={deleteIcon} height={26} width={26} alt="delete trip" />
            </button>
            

            <div className="z-10 absolute w-fit top-6 right-0 bg-white p-3 space-x-4 shadow-lg rounded-xl">
                <button
                    className="p-2 bg-slate-50 rounded-md hover:bg-slate-200"
                    onClick={() => { setShowSavedPlaces(true); setShowMap(false) }}
                >
                    <Image src={savedPlacesIcon} height={24} width={24} alt="saved places" />
                </button>
                <button
                    className="p-2 bg-slate-50 rounded-md hover:bg-slate-200"
                    onClick={() => { setShowMap(false); setShowSavedPlaces(false) }}
                >
                    <Image src={searchIcon} height={24} width={24} alt="search" />
                </button>
                <button
                    className="p-2 bg-slate-50 rounded-md hover:bg-slate-200"
                    onClick={() => { setShowMap(true); setShowSavedPlaces(false) }}
                >
                    <Image src={showMap ? mapIconColoured : mapIcon} height={24} width={24} alt="map" />
                </button>
            </div>
        </div>
        
        

        <div className="w-full flex px-5 ">
            <div className="sticky top-[11rem] h-[calc(100vh-15rem)] overflow-y-auto scrollbar-none flex flex-col w-[8rem] p-2 space-y-4 border-r">
                <p className="flex justify-center text-lg font-semibold text-slate-600">
                    Itinerary
                </p>
                {trip?.days?.map((day, index) => (
                    <button 
                        key={index}
                        onClick={() => {
                            scroller.scrollTo(day.date.split(" ").join(""), {
                                duration: 500,
                                smooth: true,
                                offset: -200 
                            });
                            setScrollToDate(day.date)
                        }}
                        className={
                            `p-2 text-sm rounded-lg hover:bg-slate-200
                            ${scrollToDate == day.date ? "bg-slate-200/60" : ""}`
                        } 
                    >
                        {day.date.slice(0, 10)}
                    </button>
                ))}
            </div>
            
            <div className="w-full space-y-8 pl-10 pr-2">
                {trip?.days?.map((day, index) => (
                    <Element key={index} name={day.date.split(" ").join("")}>
                        <div className="py-6 border-b-2 border-slate-200 space-y-6">
                            <p className="text-2xl text-slate-700 font-semibold">
                                {formatDate(day.date)}
                            </p>
                            {day.locations.length == 0 ?
                                <p className="py-1 text-lg text-slate-700">
                                    No places
                                </p>
                                :
                                day.locations?.map((location, index) => (
                                    <div key={index}>
                                        <LocationCard
                                            email={email}
                                            location={location}
                                            trip={trip}
                                            date={day.date}
                                            setChangeLocation={setChangeLocation}
                                        />
                                    </div>
                            ))}
                        </div>
                    </Element>
                ))}
            </div>
        </div>
        
    </div>
  )
}

export default TripDetails