import Link from "next/link";
import Image from "next/image"
import appColour from "@/app/icon.png"
import plan from "@/assets/navbar/plan.svg"
import planColour from "@/assets/navbar/plan-coloured.svg"
import explore from "@/assets/navbar/explore.svg"
import exploreColour from "@/assets/navbar/explore-coloured.svg"
import home from "@/assets/navbar/home.svg"
import homeColour from "@/assets/navbar/home-coloured.svg"
import account from "@/assets/navbar/account.svg"
import logout from "@/assets/navbar/logout.svg"
import { handleLogout } from "@/utils/action";
import { auth } from "@/utils/auth/auth";
import NavLink from "./NavLink"
import AuthButton from "./AuthButton";

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
                        <Link href="/account" className="absolute -left-[4rem] shadow-sm p-2 rounded-full hover:bg-slate-200" >
                            <Image src={account} height={32} width={32} alt="account settings" />
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