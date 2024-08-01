"use client"
import { useEffect, useState } from "react"
import { getTrips } from "@/utils/action"
import { useRouter } from "next/navigation"
import ItineraryCard from "./itinerary/ItineraryCard"
import homepageBg from "@/assets/homepage-background.jpg"
import Image from "next/image"
import Link from "next/link"

const HomePage = ({ email }) => {

    const [trips, setTrips] = useState(null)
    const router = useRouter()

    useEffect(() => {
        const get = async () => {
            const itinerary = await getTrips(email)
            setTrips(itinerary)
        }
        get()
    }, [email])

    const redirectToPlan = () => {
        router.push("/plan")
    }

  return (
    <div className="p-10 flex flex-col items-center">
         <Image 
            src={homepageBg} 
            fill
            style={{ opacity: "100", objectFit: "cover" }}
            alt="background image" 
            className="-z-50"
        />
        <h1 className="p-3 text-4xl font-semibold text-slate-600 rounded-xl skew-x-1 skew-y-2 bg-white">
            My Trips
        </h1>
        <div className="flex flex-wrap py-12 gap-x-8 gap-y-7 items-center justify-center">
            {trips ? 
                trips.map((trip, index) => (
                    <div key={index} className="w-[20rem] border-[0.5px] bg-white border-[#2a98ae] rounded-2xl shadow-md">    
                        <ItineraryCard
                            email={email}
                            trip={trip}
                            setShowTripDetails={redirectToPlan}
                        />
                    </div>
                )) :
                <p className="p-3 px-5 bg-slate-50 text-slate-700 text-2xl rounded-lg font-light">
                    No trips planned
                </p>
            }
        </div>
        <div className="flex justify-center mt-5 space-x-4 p-5 border-t border-slate-500">
            <Link href="/explore" className="py-4 px-5 bg-[#00b4d8] text-white font-semibold text-xl 
                rounded-3xl shadow-xl hover:bg-[#19a3bf]"
            >
                Explore
            </Link>
            <Link href="/plan" className="py-4 px-5 bg-[#ebf8fa] text-[#00b4d8] font-semibold text-xl 
                rounded-3xl shadow-xl hover:bg-[#d8f9ff]"
            >
                Plan Itinerary
            </Link>
        </div>
    </div>
  )
}

export default HomePage