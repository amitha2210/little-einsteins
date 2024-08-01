import Link from "next/link";
import AuthButton from "./AuthButton";
import { handleLogout } from "@/utils/action";
import { auth } from "@/utils/auth/auth";
import appColour from "@/app/icon.png"
import Image from "next/image"
import plan from "@/assets/plan.svg"
import explore from "@/assets/explore.svg"
import home from "@/assets/home.svg"
import account from "@/assets/account.svg"
import planColour from "@/assets/plan-coloured.svg"
import exploreColour from "@/assets/explore-coloured.svg"
import homeColour from "@/assets/home-coloured.svg"
import accountColour from "@/assets/account-coloured.svg"
import logout from "@/assets/logout.svg"
import NavLink from "./NavLink"

const navigation = [
    {
        title: "Home",
        path: "/",
        icon: home,
        iconColour: homeColour,
    },
    {
        title: "Plan",
        path: "/plan",
        icon: plan,
        iconColour: planColour,
    },
    {
        title: "Preferences",
        path: "/preferences",
        icon: plan,
        iconColour: planColour,
    },
    {
        title: "Explore",
        path: "/explore",
        icon: explore,
        iconColour: exploreColour,
    }
]

const Navbar = async () => {
    
    //returns USER object with name, email and image key-value pairs
    const session = await auth()
    
    return (
        <nav className="sticky flex flex-row top-0 p-5 justify-center items-center
            border-b-[0.25px] border-slate-300 z-50 bg-white h-24"
        >

            <Link href="/" alt="landing page" className="absolute left-[3rem]">
                <div className="flex items-center">
                        <Image src={appColour} height={30} width={30} alt="TravelGenie" />
                    <span className="text-2xl text-[#11a9c7] font-semibold ml-3">TravelGenie</span>
                </div>
            </Link>
            
            <nav className="flex space-x-16">
                {navigation.map((link, index) =>
                    <NavLink 
                        key={index} 
                        title={link.title} 
                        path={link.path} 
                        icon={link.icon} 
                        iconColour={link.iconColour} 
                    /> 
                )}
            </nav>

            <div className="absolute flex right-[2rem] p-3 bg-[#00b4d8] items-center justify-center rounded-2xl">
                {session ?
                    <div className="flex items-center">
                        <Link href="/account" className="absolute -left-[5rem] bg-slate-100 p-3 rounded-full hover:bg-slate-200" >
                            <Image src={account} height={24} width={24} alt="account settings" />
                        </Link> 
                        <form action={handleLogout}>
                            <button type="submit" className="flex text-white font-bold space-x-1 items-center">
                                <span>Sign out</span>
                                <Image src={logout} height={24} width={24} alt="logout" />
                            </button>
                        </form>
                    </div> 
                    :
                    <AuthButton />
                }
            </div>
            
        </nav>
        
    );
};

export default Navbar;