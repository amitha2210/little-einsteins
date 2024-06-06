import Link from "next/link";
import { handleLogout } from "@/utils/action";
import { auth } from "@/utils/auth/auth";

const Navbar = async () => {

  //returns USER object with name, email and image key-value pairs
  const session = await auth()
       
  return (
      <div className="fixed top-0 bg-[#D0ECE7] text-gray-600 font-semibold p-9 flex flex-row w-full justify-center items-center">
        <div>
            <Link href="/about">
                About
            </Link>
        </div>

        <div className="absolute right-[10rem] bg-white p-3 pr-5 pl-5 rounded-2xl drop-shadow-md">
            { session ?
                <>
                    <form action={handleLogout}>
                        <button type="submit">
                            Logout
                        </button>
                    </form>
                </> :
                <button>
                    <Link href="/login">
                        Login
                    </Link> 
                </button> 
            }
        </div>
      </div>
  );
};

export default Navbar;