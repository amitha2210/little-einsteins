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

import Image from "next/image"
import { saveLocationToDB, locationSaved, unsaveLocationDB } from "@/utils/action"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import ItineraryButton from "@/components/itineraryButton/ItineraryButton"

function isPopular(rating, userRatingCount) {
    if (rating > 4.0 && userRatingCount > 100) return true
    return false
}

const ResultContainer = ({ id, name, address, description, rating, userRatingCount, googleMapLink, placeImg, session }) => {

    const location = {
        id: id,
        name: name,
        address: address,
        description: description,
        rating: rating,
        userRatingCount: userRatingCount,
        googleMapLink: googleMapLink,
        placeImg: placeImg
    }
                       
    const onHomePage = usePathname().startsWith("/home")
    
    const [saved, saveLocation] = useState(onHomePage)
    const [seeDetails, setSeeDetails] = useState(false)

    useEffect(() => {
        const func = async () => {
            const check = await locationSaved(id, session?.user?.email)
            saveLocation(check)
        }
        func() 
    }, [id, saved])

    const popular = isPopular(rating, userRatingCount)

    return (
        <div className="flex my-4 shadow-slate-300 shadow-md text-slate-600 w-full rounded-xl">
            <div className="p-3 w-7/12">
                
                <h1 className="p-3 text-xl font-semibold">{name}</h1>
                
                <div className="flex flex-wrap ml-4 mb-4 space-x-5">
                    
                    <div className="flex px-3 py-1.5 bg-slate-100 text-[#00b4d8] text-sm font-semibold rounded-3xl shadow-md items-center justify-center">
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
                
                <table>
                    <tbody>
                        <tr>
                            <td className="flex p-1 h-fit size-16 justify-center">
                                <Image src={descriptionIconColoured} height={24} width={24} alt="descriptionIcon"/>
                            </td>
                            <td className="p-1">{description}</td>
                        </tr>
                        <tr className={`${seeDetails ? "" : "hidden"}`}>
                            <td className="flex p-2 h-fit size-16 justify-center">
                                <Image src={addressIconColoured} height={24} width={24} alt="addressIcon"/>
                            </td>
                            <td className="p-1 text-sm">{address}</td>
                        </tr>
                        <tr className={`${seeDetails ? "" : "hidden"}`}> 
                            <td className="flex p-2 h-fit size-16 justify-center">
                                <Image src={ratingsIconColoured} height={24} width={24} alt="descriptionIcon"/>
                            </td>
                            <td className="p-1 text-sm">{rating} ({userRatingCount})</td>
                        </tr>
                    </tbody>
                </table>
                
                {seeDetails ?
                    <button onClick={() => setSeeDetails(false) } className="flex mt-2 p-2 text-sm font-semibold items-center hover:font-bold">
                        Less details
                        <Image src={dropUpArrow} height={24} width={24} alt="see less details"/>
                    </button> 
                    :
                    <button onClick={() => setSeeDetails(true) } className="flex mt-2 p-2 text-sm items-center hover:font-bold">
                        More details
                        <Image src={dropDownArrow} height={24} width={24} alt="see more details"/>
                    </button>
                }

                <div className="flex items-center mt-4 space-x-5">
                    <p className="w-fit text-xs p-2 px-3 border shadow-sm rounded-xl">
                        <a href={googleMapLink}>Open in Google Maps</a>
                    </p>
                    
                    {session && 
                        (saved ?
                            <button onClick={() => { unsaveLocationDB(id, session.user?.email); saveLocation(false) }} 
                            className="flex bg-[#00a4c4] p-2 text-xs rounded-xl text-white font-semibold hover:bg-[#0093b1] items-center">
                                <Image src={checkIcon} height={20} width={20} alt="unsave location"/>
                            </button> 
                            : 
                            <button onClick={() => { saveLocationToDB(location, session.user?.email); saveLocation(true) }} 
                            className="bg-[#00b4d8] p-2 text-xs rounded-xl text-white font-semibold hover:bg-[#00a4c4]">
                                <Image src={addIcon} height={20} width={20} alt="save location"/>
                            </button>
                        ) 
                    }

                    {session && 
                        <ItineraryButton location={location} email={session.user?.email}/>
                    }

                </div>
            </div>
            
            <div className="relative w-5/12 -z-50 rounded-xl">
                <Image src={location.placeImg} fill={true} alt="place image" style={{objectFit: "cover"}} sizes="" className="rounded-r-xl"/>
            </div>     
        </div>
    )
}

export default ResultContainer