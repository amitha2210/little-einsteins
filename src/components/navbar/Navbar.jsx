import Link from "next/link";
import AuthButton from "./AuthButton";
import { handleLogout } from "@/utils/action";
import { auth } from "@/utils/auth/auth";
import appColour from "@/assets/app-coloured.svg"
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
        path: "/home",
        icon: home,
        iconColour: homeColour,
        shown: true 
    },
    {
        title: "Plan",
        path: "/plan",
        icon: plan,
        iconColour: planColour,
        shown: true
    },
    {
        title: "Explore",
        path: "/explore",
        icon: explore,
        iconColour: exploreColour,
        shown: true
    },
    {
        title: "Account",
        path: "/account",
        icon: account,
        iconColour: accountColour,
        shown: false
    }
]

const Navbar = async () => {
    
    //returns USER object with name, email and image key-value pairs
    const session = await auth()
    
    return (
        <nav className="sticky flex flex-row top-0 p-5 justify-center items-center
        border-b-[0.25px] border-slate-300">

            <Link href="/" alt="landing page" className="absolute left-[5rem]">
                <div className="flex items-center">
                        <Image src={appColour} height={50} width={50} alt="myAppName" />
                    <span className="text-2xl text-[#00b4d8] font-bold ml-3">AppName</span>
                </div>
            </Link>
            
            <nav className="flex space-x-16">
                {navigation.map((link, index) =>
                <NavLink key={index} title={link.title} path={link.path} icon={link.icon} iconColour={link.iconColour} 
                shown={link.shown} session={session}/> )}
            </nav>

            <div className="absolute flex right-[5rem] py-3 px-5 bg-[#00b4d8] items-center justify-center rounded-[30px]">
                {session ?
                <form action={handleLogout}>
                    <button type="submit" className="flex text-white font-bold space-x-2 items-center">
                        <span>Sign out</span>
                        <Image src={logout} height={28} width={28} alt="logout" />
                    </button>
                </form> :
                <AuthButton />}
            </div>
            
        </nav>
        
    );
};

export default Navbar;