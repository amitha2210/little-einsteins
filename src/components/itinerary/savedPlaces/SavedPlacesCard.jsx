"use client"
import addressIcon from "@/assets/address.svg"
import ratingsIcon from "@/assets/ratings.svg"
import descriptionIcon from "@/assets/description.svg"
import descriptionIconColoured from "@/assets/description-coloured.svg"
import ratingsIconColoured from "@/assets/ratings-coloured.svg"
import addressIconColoured from "@/assets/address-coloured.svg"
import popularIcon from "@/assets/popular.svg"
import hikingIcon from "@/assets/hiking.svg"
import dropDownArrow from "@/assets/drop-down-arrow.svg"
import dropUpArrow from "@/assets/drop-up-arrow.svg"
import checkIcon from "@/assets/check.svg"
import addIcon from "@/assets/add.svg"
import openingHoursIcon from "@/assets/openinghours.svg"

import Image from "next/image"
import { saveLocationToDB, locationSaved, unsaveLocationDB } from "@/utils/action"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import AddToItineraryButton from "./AddToItineraryButton"

function isPopular(rating, userRatingCount) {
    if (rating > 4.0 && userRatingCount > 100) return true
    return false
}

const SavedPlacesCard = ({ email, location, selectedTrip, setChangeLocation }) => {
                       
    const onHomePage = usePathname().startsWith("/home")
    
    const [saved, saveLocation] = useState(onHomePage)
    const [seeDetails, setSeeDetails] = useState(false)

    useEffect(() => {
        const func = async () => {
            const check = await locationSaved(location.id, email)
            saveLocation(check)
        }
        func() 
    }, [location.id, saved])

    const popular = isPopular(location.rating, location.userRatingCount)

    return (
        <div className="relative flex my-4 shadow-slate-300 shadow-md border-[#0093b1]/30 border text-slate-600 w-full rounded-xl">
            <div className="p-2 pb-3 w-7/12">
                
                <h1 className="relative -z-40 p-3 text-xl font-semibold">{location.name}</h1>
                
                <div className="relative -z-40 flex flex-wrap ml-4 mb-4 space-x-5">
                    
                    <div className="flex p-1.5 bg-slate-100 text-[#00b4d8] text-sm font-semibold rounded-3xl shadow-md items-center justify-center">
                        <Image src={hikingIcon} height={20} width={20} alt="popular" />
                        &nbsp; place type
                    </div>
                    
                    {popular &&
                        <div className="flex bg-slate-500 px-3 py-1.5 text-white text-sm font-bold rounded-3xl shadow-md items-center justify-center">
                            <Image src={popularIcon} height={20} width={20} alt="popular" />
                            &nbsp; popular
                        </div>
                    }

                </div>                 
                
                <table className="relative -z-40">
                    <tbody>
                        <tr>
                            <td className="flex p-2 h-fit size-10 justify-center">
                                <Image src={descriptionIconColoured} height={24} width={24} alt="descriptionIcon"/>
                            </td>
                            <td className="p-1 text-sm">{location.description}</td>
                        </tr>
                        <tr className={`${seeDetails ? "" : "hidden"}`}>
                            <td className="flex p-2 h-fit size-10 justify-center">
                                <Image src={addressIconColoured} height={24} width={24} alt="addressIcon"/>
                            </td>
                            <td className="p-1 text-sm">{location.address}</td>
                        </tr>
                        <tr className={`${seeDetails ? "" : "hidden"}`}> 
                            <td className="flex p-2 h-fit size-10 justify-center">
                                <Image src={ratingsIconColoured} height={24} width={24} alt="details icon"/>
                            </td>
                            <td className="p-1 text-sm">{location.rating} {location.userRatingCount && `(${location.userRatingCount})` }</td>
                        </tr>
                        <tr className={`${seeDetails ? "" : "hidden"}`}> 
                            <td className="flex p-2 h-fit size-10 justify-center">
                                <Image src={openingHoursIcon} height={24} width={24} alt="opening hours icon"/>
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
                    <button onClick={() => setSeeDetails(false) } className="relative z-0 flex p-2 text-sm font-semibold items-center hover:font-bold">
                        Less details
                        <Image src={dropUpArrow} height={24} width={24} alt="see less details"/>
                    </button> 
                    :
                    <button onClick={() => setSeeDetails(true) } className="relative z-0 flex p-2 text-sm items-center hover:font-bold">
                        More details
                        <Image src={dropDownArrow} height={24} width={24} alt="see more details"/>
                    </button>
                }

                <div className="flex items-center mt-2 space-x-5">
                    
                    <a className="w-fit text-xs p-2 px-3 border shadow-sm rounded-xl" href={location.googleMapLink}>
                        Open in Google Maps
                    </a>
                    
                    {email && 
                        (saved ?
                            <button onClick={() => { unsaveLocationDB(location.id, email); saveLocation(false) }} 
                            className="flex bg-[#00a4c4] p-2 text-xs rounded-xl text-white font-semibold hover:bg-[#0093b1] items-center">
                                <Image src={checkIcon} height={20} width={20} alt="unsave location"/>
                            </button> 
                            : 
                            <button onClick={() => { saveLocationToDB(location, email); saveLocation(true) }} 
                            className="bg-[#00b4d8] p-2 text-xs rounded-xl text-white font-semibold hover:bg-[#00a4c4]">
                                <Image src={addIcon} height={20} width={20} alt="save location"/>
                            </button>
                        ) 
                    }

                    {selectedTrip &&
                        <AddToItineraryButton 
                            email={email}
                            location={location}
                            trip={selectedTrip}
                            setChangeLocation={setChangeLocation}
                        />
                    }

                </div>
            </div>
            
            {location.placeImg ?
                <div className="relative w-5/12 rounded-xl -z-50">
                    <Image src={location.placeImg} fill={true} alt="place image" style={{objectFit: "cover"}} sizes="" className="rounded-r-xl"/>
                </div>
                :
                <div className="w-5/12 flex items-center justify-center font-semibold bg-slate-50">
                    Image not available
                </div>
            }     
        </div>
    )
}

export default SavedPlacesCard