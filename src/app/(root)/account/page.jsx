import Account from "@/components/Account"
import { auth } from "@/utils/auth/auth"

const AccountPage = async () => {

  const session = await auth()
  console.log(session)
  const email = session?.user?.email

  return (
    <div>
      <Account email={email} />
    </div>
  )
}

export default AccountPage
