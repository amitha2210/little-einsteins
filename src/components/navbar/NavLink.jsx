"use client"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

const NavLink = ({ title, path, icon, iconColour, shown, session }) => {

    const pathname = usePathname()

  return (
    (shown || session) &&
    
    <Link href={path} className={`flex flex-col relative top-3 items-center text-sm p-1 min-w-20
    ${pathname.startsWith(path) ?  "text-[#00B4D8] font-bold": "text-gray-600"}`}>

        {pathname.startsWith(path) ?
        <Image src={iconColour} height={28} width={28} alt={title} className="mb-1"/> :
        <Image src={icon} height={24} width={24} alt={title} className="mb-1"/>}
        
        {title}
    </Link> 
    
  )
}

export default NavLink
