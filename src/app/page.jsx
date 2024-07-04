import Link from "next/link"

export default function LandingPage() {
  
  return (
    <>
      <div className="flex text-5xl p-5 mt-[15rem] font-bold font text-[#00b4d8] justify-center items-center">
        WELCOME TO &nbsp; <i>APPNAME</i>
      </div>
      <div className="flex mt-10 justify-center space-x-10">
        <Link href="/register" className="py-5 px-7 m-5 bg-[#00b4d8] text-white font-bold text-xl rounded-full">
          Get Started 
        </Link>
        <Link href="/home" className="py-5 px-7 m-5 bg-[#ebf8fa] text-[#00b4d8] font-bold text-xl rounded-full">
          Start Planning
        </Link>
      </div>
    </>
    
  )
}