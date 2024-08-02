"use client"
import { useFormState } from "react-dom"
import { updateUsername, getUserByEmail, updatePassword } from "@/utils/action"
import ErrorMessage from "./ErrorMessage"
import { useEffect, useState } from "react"

const Account = ({ email }) => {

    const [usernameChanged, changeUsername] = useFormState(updateUsername.bind(null, email), null)
    const [passwordChanged, changePassword] = useFormState(updatePassword.bind(null, email), null)

    const [user, setUser] = useState(null)

    useEffect(() => {
        const getUser = async () => {
            const credentials = await getUserByEmail(email)
            setUser(credentials)
        }
        getUser()
    }, [email, usernameChanged])
    
  return (
    <div className="flex flex-col text-slate-600">
        {user &&
            <div className="p-6 flex flex-col justify-center items-center">
                <div className="flex items-center justify-center">
                    <div className="bg-[#19a3bf] text-white text-xl p-3 px-5 rounded-full">
                        {user?.username[0].toUpperCase()}
                    </div>
                    <div className="ml-6 space-y-1">
                        <p className="text-lg">{user?.username}</p>
                        <p className="text-sm">{user?.email}</p>
                    </div>
                </div>
                <div className="text-sm mt-6 grid grid-cols-2 gap-x-3">
                    <div className="text-center border-r-2">
                        <p className="pb-1 font-medium">Joined</p>
                        {user?.user_created.toDateString().slice(4)}
                    </div> 
                    <div className="text-center">
                        <p className="pb-1 font-medium">Profile last updated</p>
                        {user?.updated.toDateString().slice(4)}
                    </div>
                </div>
            </div>
        }    
        <div className="flex flex-col items-center mt-2 space-y-7 justify-center">
            <p className="text-xl border-b border-slate-600 p-2 px-5">
                Update Profile
            </p>
            <form action={changeUsername}>
                <p className="bg-slate-100 p-2 shadow-sm mb-4 w-fit rounded-lg">Username</p>
                <input 
                    type="text" 
                    placeholder="Enter new username" 
                    name="username" 
                    className="text-sm w-[15rem] outline-none border p-2 rounded-lg focus:border-slate-600"
                />
                <button 
                    type="submit"
                    className="ml-5 bg-[#19a3bf] text-white font-medium rounded-lg p-2"
                >
                    save
                </button>
                {usernameChanged &&
                    <ErrorMessage 
                        success={usernameChanged.success}
                        message={usernameChanged.error || usernameChanged.success} 
                    />
                }
            </form>
            <form action={changePassword} className="space-y-4">
                <p className="place-self-start w-fit bg-slate-100 p-2 shadow-sm rounded-lg">
                    Password
                </p>
                <div className="flex justify-center items-center">
                    <div className="flex flex-col space-y-3">
                        <input 
                            type="password" 
                            placeholder="Enter new password"
                            name="password" 
                            className="text-sm w-[15rem] outline-none border p-2 rounded-lg focus:border-slate-600"
                        />
                        <input 
                            type="password" 
                            placeholder="Enter new password again"
                            name="passwordAgain" 
                            className="text-sm w-[15rem] outline-none border p-2 rounded-lg focus:border-slate-600"
                        />
                    </div>
                    <button 
                        type="submit"
                        className="ml-5 bg-[#19a3bf] text-white font-medium rounded-lg p-2"
                    >
                        save
                    </button>
                </div>
                {passwordChanged &&
                    <ErrorMessage 
                        success={passwordChanged.success}
                        message={passwordChanged.error || passwordChanged.success} 
                    />
                }
            </form>
        </div>
       
    </div>

  )
}

export default Account