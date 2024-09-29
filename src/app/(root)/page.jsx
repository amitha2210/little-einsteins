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
        <HomePage email={email} />
        :
        <Landing />
      }
  </>
  )
}