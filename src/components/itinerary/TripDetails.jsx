"use client"
import { useEffect, useState } from "react"
import LocationCard from "./LocationCard"
import { Element, scroller } from "react-scroll"

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

const TripDetails = ({ email, trip, setChangeLocation }) => {

    const [scrollToDate, setScrollToDate] = useState(null)
    

    useEffect(() => {
        setScrollToDate(trip.days?.[0].date)
    }, [trip])

  return (
    <div className="w-full pb-10">
        <h1 className="z-10 sticky top-[6rem] py-5 px-7 bg-white text-4xl font-bold text-[#00738a]">
            Trip to {trip.trip}
        </h1>
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
            {/* <div className="w-1/2">
                {showLocations &&     
                    showLocations.locations?.map((location, index) => (
                        <div key={index}>
                            <LocationCard
                                email={email}
                                location={location}
                            />
                        </div>
                ))}
            </div> */}
            <div className="w-full space-y-8 pl-5">
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