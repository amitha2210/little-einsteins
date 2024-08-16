"use client"
import Image from "next/image"
import { useEffect, useState } from "react"
import { findTripCoverPic } from "@/utils/action"

const ItineraryCard = ({ email, trip, setShowTripDetails }) => {

    const [coverPic, setCoverPic] = useState(null)

    useEffect(() => {
        const func = async () => {
            const pic = await findTripCoverPic(email, trip.trip)
            setCoverPic(pic)
        }
        func()
    }, [])
        
    return (
        <div 
            className="flex w-full"
            onClick={() => setShowTripDetails(trip)}
        >
           
            <div className="w-7/12 p-4">
                <p className="truncate mb-1 text-lg font-semibold text-slate-600">
                    {trip.trip}
                </p>
                <span className="text-sm font-light">
                    {trip.startDate} ~ <br/> {trip.endDate}
                </span>
            </div>
            <div className="relative w-5/12">
                {coverPic && 
                    <Image 
                        src={coverPic} 
                        alt="trip cover photo" 
                        fill={true} 
                        style={{objectFit: "cover"}}
                        sizes="(max-width: 1536px) 30vw" 
                        className="rounded-r-2xl"
                    />
                }
            </div>
            
        </div> 
            
    )
}

export default ItineraryCard