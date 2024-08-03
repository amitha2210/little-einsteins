import twitter from "@/assets/socials/twitter.svg"
import discord from "@/assets/socials/discord.svg"
import facebook from "@/assets/socials/facebook.svg"
import telegram from "@/assets/socials/telegram.svg"
import instagram from "@/assets/socials/instagram.svg"
import Link from "next/link"
import Image from "next/image"

const socials = [
  {
    title: "Twitter",
    icon: twitter,
    url: "/"
  },
  {
    title: "Discord",
    icon: discord,
    url: "/"
  },
  {
    title: "Facebook",
    icon: facebook,
    url: "/"
  },
  {
    title: "Telegram",
    icon: telegram,
    url: "/"
  },
  {
    title: "Instagram",
    icon: instagram,
    url: "/"
  },
]

const Footer = () => {
  return (
    <footer className="absolute bottom-0 w-full h-[12rem] bg-[#11a9c7]/90 text-slate-50 p-5 px-12 shadow-sm">
      <div className="w-full justify-between flex">
        <div>
          <h1 className="text-white text-lg font-semibold mb-2 border-b pb-0.5">About TravelGenie</h1>
          <p className="text-base">
            Your go-to travel companion. 
            <br/> 
            Explore new destinations with us today!
          </p>
        </div>
        
        <div className="flex flex-col space-y-1">
          <h1 className="text-white text-lg font-medium mb-1 border-b pb-0.5">Quick Links</h1>
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/plan" className="hover:underline">Plan</Link>
          <Link href="/explore" className="hover:underline">Explore</Link>
        </div>
        
        <div>
          <h1 className="text-white text-lg font-medium mb-2 border-b pb-0.5">Contact Us</h1>
          <p>Email: info@travelgenie.com</p>
          <p>Phone: +12 3456 7890</p>
        </div>
        
        <div>
          <p className="text-white text-lg font-medium mb-3">Follow Us</p>
          <div className="flex space-x-3">
            {socials.map((social, index) => (
              <Link key={index} href={social.url} className="bg-slate-100 p-2 rounded-full hover:bg-slate-200">
                <Image src={social.icon} height={20} width={20} alt={social.title} />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-6 right-5 text-sm place-self-end">
        &copy; 2024 TravelGenie. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer