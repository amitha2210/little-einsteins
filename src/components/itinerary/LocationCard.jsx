"use client"
import descriptionIcon from "@/assets/description.svg"
import ratingsIcon from "@/assets/ratings.svg"
import addressIcon from "@/assets/address.svg"
import dropDownArrow from "@/assets/drop-down-arrow.svg"
import dropUpArrow from "@/assets/drop-up-arrow.svg"
import openingHours from "@/assets/openinghours.svg"
import deleteIcon from "@/assets/delete.svg"
import scheduleIcon from "@/assets/schedule.svg"
import changeDateIcon from "@/assets/change-date.svg"

import { changeLocationDateItinerary, removeLocationFromItinerary, setLocationItineraryTime } from "@/utils/action"

import Image from "next/image"
import { useEffect, useState } from "react"
import { useFormState } from "react-dom"

const LocationCard = ({ email, trip, location, date, setChangeLocation }) => {
    
    const [seeDetails, setSeeDetails] = useState(false)
    const [openDateMenu, setOpenDateMenu] = useState(false)
    const [openTimeMenu, setOpenTimeMenu] = useState(false)

    const [state, setLocationTime] = useFormState(
        setLocationItineraryTime.bind(null, location.id, trip.trip, email, date), null
    )
    
    useEffect(() => {
        setOpenTimeMenu(false)
        setChangeLocation(state)
    }, [state])

    const changeLocationDate = (newDate) => {
        setOpenDateMenu(false)
        const func = async () => {
            const changed = await changeLocationDateItinerary(location, trip.trip, email, date, newDate)
            setChangeLocation(changed)
        }
        func()
    }

    const removeLocation = () => {
        const func = async () => {
            const changed = await removeLocationFromItinerary(location.id, trip.trip, email, date)
            setChangeLocation(changed)
        }
        func()
    }

    return (
        <div className="w-full flex">

            <div className="flex w-7/12 min-w-[22rem] min-h-[9rem] bg-gray-100 text-slate-600 rounded-2xl shadow-sm">
                <div className="relative w-full px-3 pb-2">
                    
                    <h1 className="p-2 text-lg text-slate-700 font-semibold">{location.name}</h1>
                    
                    <table>
                        <tbody>
                            <tr>
                                <td className="flex p-2 h-fit size-10 justify-center">
                                    <Image src={addressIcon} height={24} width={24} alt="addressIcon"/>
                                </td>
                                <td className="p-1 text-sm">{location.address}</td>
                            </tr>
                            <tr className={`${seeDetails ? "" : "hidden"}`}>
                                <td className="flex p-2 h-fit size-10 justify-center">
                                    <Image src={descriptionIcon} height={24} width={24} alt="descriptionIcon"/>
                                </td>
                                <td className="p-1 text-sm">{location.description}</td>
                            </tr>
                            
                            <tr className={`${seeDetails ? "" : "hidden"}`}> 
                                <td className="flex p-2 h-fit size-10 justify-center">
                                    <Image src={ratingsIcon} height={24} width={24} alt="descriptionIcon"/>
                                </td>
                                <td className="p-1 text-sm">{location.rating} ({location.userRatingCount})</td>
                            </tr>
                            <tr className={`${seeDetails ? "" : "hidden"}`}> 
                                <td className="flex p-2 h-fit size-10 justify-center">
                                    <Image src={openingHours} height={24} width={24} alt="opening hours icon"/>
                                </td>
                                <td className="p-1 text-sm">
                                    {typeof location.regularOpeningHours === "string" ?
                                        location.regularOpeningHours
                                        :
                                        location.regularOpeningHours.map((day, index) => (
                                            <p key={index}>
                                                {day}
                                            </p>
                                        ))
                                    }
                                </td>
                                
                            </tr>
                        </tbody>
                    </table>
                    
                    {seeDetails ?
                        <button onClick={() => setSeeDetails(false) } className="flex mt-1 p-2 text-sm font-semibold items-center hover:font-bold">
                            Less details
                            <Image src={dropUpArrow} height={24} width={24} alt="see less details"/>
                        </button> 
                        :
                        <button onClick={() => setSeeDetails(true) } className="flex mt-1 p-2 text-sm items-center hover:font-bold">
                            More details
                            <Image src={dropDownArrow} height={24} width={24} alt="see more details"/>
                        </button>
                    }

                    {seeDetails && 
                        <div className="flex items-center mt-2 space-x-5">
                            <p className="w-fit text-xs p-2 px-3 border shadow-sm rounded-xl bg-white">
                                <a href={location.googleMapLink}>Open in Google Maps</a>
                            </p>
                        </div>
                    }

                    <div className="absolute bottom-3 right-3 flex space-x-2">
                        
                        <button 
                            onClick={() => setOpenTimeMenu(!openTimeMenu)}
                            className={`${openTimeMenu ? "bg-slate-300" : "bg-white"} flex items-center space-x-1 p-1 rounded-md hover:bg-slate-200`}
                        >
                            <Image src={scheduleIcon} height={20} width={20} alt="schedule"/>
                            <span className="text-[0.7rem] text-[#19a3bf]">
                                {location.startTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                                ~
                                {location.endTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                            </span>

                        </button>

                        {openTimeMenu && 
                            <form 
                                action={setLocationTime}
                                className="absolute top-10 z-10 w-[12rem] p-4 bg-white flex flex-col items-center mt-3 space-y-5
                                    border-slate-300 border rounded-lg"
                            >
                                <p className="w-full text-center font-semibold border-b pb-2">
                                    Time of Visit:
                                </p>
                                
                                <input type="time" name="startTime" placeholder="Select time" required/>
                                
                                <input type="time" name="endTime" placeholder="Select time" required/>
                                
                                <button className="relative p-1 px-2 bg-[#19a3bf] text-white font-semibold shadow-lg rounded-lg hover:bg-[#19a3bf]/80">
                                    Set Time
                                </button>
                            </form>
                        }
                        
                        <button 
                            onClick={() => setOpenDateMenu(!openDateMenu)}
                            className={`${openDateMenu ? "bg-slate-300" : "bg-white"} p-1 rounded-md hover:bg-slate-200`}
                        >
                            <Image src={changeDateIcon} height={20} width={20} alt="change date"/>
                        </button>
                        
                        {openDateMenu && 
                            <div className="z-50 absolute top-10 p-2 py-4 border border-slate-200 bg-white flex flex-wrap w-[21rem] max-h-[15rem] overflow-y-auto scrollbar-thin gap-x-4 gap-y-3 rounded-md justify-center">
                                <p className="w-full text-center font-semibold border-b pb-2">
                                    CHANGE ITINERARY
                                </p>
                                {trip.days.map((day, index) => (
                                    !(day.date == date) && 
                                        <button
                                            key={index} 
                                            onClick={() => { changeLocationDate(day.date) }}
                                            className="text-sm py-1 px-2 bg-slate-100 rounded-xl hover:bg-slate-200"
                                        >
                                            {day.date.slice(0, 10)}
                                        </button>
                                ))}
                            </div>
                        }
                        
                        

                        <button 
                            onClick={() => removeLocation()}
                            className=" bg-white p-1 rounded-md hover:bg-slate-200"
                        >
                            <Image src={deleteIcon} height={20} width={20} alt="delete"/>
                        </button>
                    
                    </div>
                </div>
            </div>
            <div className="relative w-4/12 h-[9rem] ml-6">
                {location.placeImg && 
                    <Image 
                        src={location.placeImg} 
                        fill={true} 
                        alt="place image" 
                        style={{objectFit: "cover"}} 
                        sizes="(max-width: 1536px) 30vw" 
                        className="rounded-xl"
                    />
                }
            </div>
        </div>
        
    )
}

export default LocationCard