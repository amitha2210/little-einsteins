import Image from "next/image"
import authBackground from "@/assets/background/auth.jpg"

const layout = ({ children }) => {
  return (
    <main className="flex h-screen">
        {children}
        <div className="relative items-center justify-center hidden lg:flex w-full">
          <div className="relative skew-y-3 bottom-20 bg-white text-6xl p-5 text-[#2a98ae] font-semibold rounded-lg shadow-2xl">
            TravelGenie
            <p className="text-2xl text-center pt-3 text-slate-600">
              Explore the world!
            </p>
          </div>
          <Image 
            src={authBackground}
            fill
            style={{ opacity: "100%", objectFit: "cover" }}
            alt="background image"
            className="-z-50"
          />
          
        </div>    
    </main>
  )
}

export default layout