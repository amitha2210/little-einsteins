"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import menuIcon from "@/assets/navbar/menu.svg"
import logout from "@/assets/navbar/logout.svg"
import login from "@/assets/navbar/logout.svg"
import { handleLogout } from "@/utils/action";

const navigation = [
    {
        title: "Home",
        path: "/",
    },
    {
        title: "Plan",
        path: "/plan",
    },
    {
        title: "Preferences",
        path: "/preferences",
    },
    {
        title: "Explore",
        path: "/explore",
    }
]

const Menu = ({ session }) => {
    const [open, setOpen] = useState(false)
    const [windowWidth, setWindowWidth] = useState(null)

    useEffect(() => {
        if (windowWidth >= 1024) {
            setOpen(false)
        }
    }, [windowWidth])

    useEffect(() => {
        if (typeof window !=='undefined') {
            setWindowWidth(window.innerWidth)
            const handleResize = () => {
                setWindowWidth(window.innerWidth)
            };
        
            window.addEventListener('resize', handleResize)

            return () => {
                window.removeEventListener('resize', handleResize)
            };
        }
    }, []); 
    
  return (
    <div className="absolute right-[2rem]">
        <button 
            className="flex lg:hidden"
            onClick={() => setOpen(!open)}
        >
            <Image src={menuIcon} height={30} width={30} alt="menu"/>

        </button>

        {open &&
            <div className="fixed top-24 left-0 border h-[calc(100vh-6rem)] w-screen flex flex-col items-center justify-center
                bg-white/95 space-y-8"
            >
                {navigation.map((link, index) => 
                    <button key={index} onClick={() => setOpen(false)}>
                        <Link 
                            href={link.path}
                            className="p-2 hover:bg-slate-100 rounded-lg text-slate-700 text-2xl font-light" 
                        >
                            {link.title}
                        </Link> 
                    </button>
                    
                )}
                {session ?
                    <>
                        <button onClick={() => setOpen(false)}>
                            <Link 
                                href="/account"
                                className="p-2 hover:bg-slate-100 rounded-lg text-slate-700 text-2xl font-light" 
                            >
                                Account
                            </Link> 
                        </button>
                        <form action={handleLogout}>
                            <button 
                                type="submit" 
                                className="bg-[#00b4d8] p-2 px-4 rounded-lg flex text-xl text-white space-x-1 items-center"
                            >
                                <span>Sign out</span>
                                <Image src={logout} height={24} width={24} alt="logout" />
                            </button>
                        </form>
                    </>
                    :
                    <Link href="/login" className="bg-[#00b4d8] p-2 px-4 rounded-lg flex text-xl text-white space-x-1 items-center">
                        <span>Log in</span>
                        <Image src={login} height={24} width={24} alt="login" />
                    </Link>
                    
                }
            </div>

        }
    </div>
  )
}

export default Menu