import { auth } from "@/utils/auth/auth"
import Itinerary from "@/components/itinerary/Itinerary"
import Landing from "@/components/Landing"
import HomePage from "@/components/HomePage"

export default async function Home() {

  const session = await auth()
  const email = session?.user?.email
  
  return (
    <>
      {email ?
        <div className="flex flex-col w-full items-center justify-center">   
          <Itinerary email={email} />
        
        </div>
        //<HomePage email={email} />
        :
        <Landing />
      }
  </>
  )
}