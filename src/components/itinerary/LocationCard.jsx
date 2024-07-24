"use client"
import descriptionIcon from "@/assets/description.svg"
import ratingsIcon from "@/assets/ratings.svg"
import addressIcon from "@/assets/address.svg"
import hikingIcon from "@/assets/hiking.svg"
import dropDownArrow from "@/assets/drop-down-arrow.svg"
import dropUpArrow from "@/assets/drop-up-arrow.svg"
import openingHours from "@/assets/openinghours.svg"


import Image from "next/image"
import { useState } from "react"


const LocationCard = ({ email, location }) => {
    
    const [seeDetails, setSeeDetails] = useState(false)

    return (
        <div className="w-full border flex">

            <div className="flex w-7/12 min-h-[10rem] bg-gray-100 text-slate-600 rounded-2xl">
                <div className="px-3 pb-2">
                    
                    <h1 className="p-3 text-lg text-slate-700 font-semibold">{location.name}</h1>
                    
                    {/* <div className="flex flex-wrap ml-4 mb-4 space-x-5">
                        
                        <div className="flex px-3 py-1.5 bg-slate-100 text-[#00b4d8] text-sm font-semibold rounded-3xl shadow-md items-center justify-center">
                            <Image src={hikingIcon} height={20} width={20} alt="popular" />
                            &nbsp; place type
                        </div>
                    
                    </div>                  */}
                    
                    <table>
                        <tbody>
                            <tr>
                                <td className="flex p-2 h-fit size-16 justify-center">
                                    <Image src={addressIcon} height={24} width={24} alt="addressIcon"/>
                                </td>
                                <td className="p-1 text-sm">{location.address}</td>
                            </tr>
                            {/* <tr className={`${seeDetails ? "" : "hidden"}`}>
                                <td className="flex p-2 h-fit size-16 justify-center">
                                    <Image src={descriptionIcon} height={24} width={24} alt="descriptionIcon"/>
                                </td>
                                <td className="p-1">{location.description}</td>
                            </tr> */}
                            
                            {/* <tr className={`${seeDetails ? "" : "hidden"}`}> 
                                <td className="flex p-2 h-fit size-16 justify-center">
                                    <Image src={ratingsIcon} height={24} width={24} alt="descriptionIcon"/>
                                </td>
                                <td className="p-1 text-sm">{location.rating} ({location.userRatingCount})</td>
                            </tr> */}
                            <tr className={`${seeDetails ? "" : "hidden"}`}> 
                                <td className="flex p-2 h-fit size-16 justify-center">
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

                    {seeDetails && 
                        <div className="flex items-center mt-2 space-x-5">
                            <p className="w-fit text-xs p-2 px-3 border shadow-sm rounded-xl bg-white">
                                <a href={location.googleMapLink}>Open in Google Maps</a>
                            </p>
                        </div>
                    }
                </div>
            </div>
            <div className="relative w-4/12 min-h-[10rem] ml-6">
                <Image src={location.placeImg} fill={true} alt="place image" style={{objectFit: "cover"}} sizes="" className="rounded-xl"/>
            </div>
        </div>
        
    )
}

export default LocationCard