import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import ConnectionToDB from "../mongodb"
import bcryptjs from "bcryptjs"
import { authConfig } from "./auth.config"
 
const login = async (credentials) => {
    try {
        const client = await ConnectionToDB
        const user = await client.db("credentials").collection("credentials").findOne({ "username": credentials.username })
        if(!user) {
            throw new Error("Invalid Username or Password!")
        }
        const correctPassword = await bcryptjs.compare(credentials.password, user.password)
        
        if(!correctPassword) {
            throw new Error("Invalid Username or Password!")
        }
        return user

    } catch (error) {
        console.log(error)
        throw new Error("Failed to login!")
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    providers: [
    Google,
    Credentials({
        authorize: async (credentials) => {
            // try {
            //     const user = await login(credentials)
            //     //console.log(user)
            //     return user
            // } catch (error) {
            //     return null
            // }
            const user = await login(credentials)
            if (user) return user
            return null
        }
    })],
  callbacks: {
    async signIn({ user, account, profile }) {
        console.log(user)
        console.log(account)
        console.log("HERE")
        console.log(profile)
        
        if (account.provider === "google") {
            try {
                const client = await ConnectionToDB
                const user = await client.db("credentials").collection("credentials")
                                            .findOne({ "email": profile.email })
                console.log(user)
                if (!user) {
                    await client.db("credentials").collection("credentials").insertOne({
                        username: profile.name,
                        email: profile.email,
                        emailVerified: true,
                        profile_pic: profile.picture,
                        user_created: new Date(),
                        updated: new Date()
                    })
                }
                return true
            } catch (error) {
                console.log(error)
                return false
            }
        }
        const client = await ConnectionToDB
        const user1 = await client.db("credentials").collection("credentials")
                                    .findOne({ "email": user.email })
        if (!user1?.emailVerified) return false
        return true
    },
    ...authConfig.callbacks,
  },
})