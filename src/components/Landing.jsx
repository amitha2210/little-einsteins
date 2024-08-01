import Link from "next/link"
import Image from "next/image"
import expenses from "@/assets/features/expenses.svg"
import collaborate from "@/assets/features/collaborate.svg"
import manage from "@/assets/features/manage.svg"
import generate from "@/assets/features/generate.svg"
import landingPageBg from "@/assets/landing-page.jpg"

const features = [
    {
        title: "Manage Itinerary",
        text: "Manage and plan your flights, hotels and places of visit in one place.",
        imageUrl: manage
    },
    {
        title: "Generate Itinerary",
        text: "Make use of our AI-powered tool to generate a personalised itinerary so you can plan a getaway trip quickly!",
        imageUrl: generate
    },
    {
        title: "Plan with friends",
        text: "Planning trips with friends will no longer be a hassle with our real-time collaborative feature.",
        imageUrl: collaborate
    },
    {
        title: "Track expenses",
        text: "Budget and keep track of your expenses easily. Split shared expenses with friends by using our expense tracker.",
        imageUrl: expenses
    }
]

export default function Landing() {
    return (
        <>
            <div className="relative pt-10 pb-20"> 
                <div className="text-6xl p-3 mt-6 font-semibold font text-[#00b4d8] flex justify-center">
                    <div className="skew-x-3 skew-y-2 w-fit bg-white p-6 rounded-2xl shadow-2xl">
                        TravelGenie
                        <p className="text-center text-xl italic text-slate-700 font-light pt-3">
                        The only travel companion you need
                        </p>
                    </div>
                </div>
            
                <div className="flex justify-center mt-5 space-x-2">
                    <Link href="/explore" className="py-4 px-5 m-5 bg-[#00b4d8] text-white font-semibold text-xl rounded-3xl shadow-xl hover:bg-[#19a3bf]">
                        Explore
                    </Link>
                    <Link href="/login" className="py-4 px-5 m-5 bg-[#ebf8fa] text-[#00b4d8] font-semibold text-xl rounded-3xl shadow-xl hover:bg-[#d8f9ff]">
                        Start Planning
                    </Link>
                </div>

                <Image 
                    src={landingPageBg} 
                    fill
                    style={{ opacity: "90%", objectFit: "cover" }}
                    alt="background image" 
                    className="-z-50"
                />
            </div>

            <div className="text-center font-medium pt-14 text-4xl text-slate-600">
                Use TravelGenie to plan your trips with ease
            </div>

            <div className="grid grid-cols-2 items-center justify-center py-10 px-60 gap-5">
                {features.map((feature, index) => (
                    <div 
                        key={index} 
                        className="even:translate-y-10 h-full w-full p-10 border border-[#00b4d8]/50 flex flex-col items-center justify-center 
                        space-y-10 rounded-3xl shadow-lg bg-slate-50/30"
                    >
                        <Image src={feature.imageUrl} height={150} width={150} alt="feature icon"/>
                        <div className="space-y-2">
                            <h1 className="font-light text-slate-800 text-2xl">
                                {feature.title}
                            </h1>
                            <p className="text-lg text-slate-500">
                                {feature.text}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}