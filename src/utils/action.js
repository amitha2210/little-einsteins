//FORM ACTION FUNCTIONS
"use server"
import ConnectionDB from "./mongodb"
import bcryptjs from "bcryptjs"
import { signIn, signOut } from "./auth/auth"
import { AuthError } from "next-auth"
import { generateVerificationToken, sendVerificationEmail } from "./emailVerification/verification"

export const handleGoogleLogin = async () => {
    await signIn("google", { redirectTo: "/" })
}

export const handleLogout = async () => {
    await signOut({redirectTo: "/home"}) 
}

export const register = async (previousState, formData) => {
    const { username, email, password, passwordAgain } = Object.fromEntries(formData)

    if (password !==passwordAgain) {
       return { error: "Passwords do not match!" }
    }

    const salt = await bcryptjs.genSalt(10)
    const hashedpassword = await bcryptjs.hash(password, salt)

    try {
        const client = await ConnectionDB
        const user = await client.db("credentials").collection("credentials").findOne({ "username": username })
        if (user) {
            return { error: "Username already exists" }
        }
        await client.db("credentials").collection("credentials").insertOne({
            username: username,
            email: email,
            emailVerified: false,
            password: hashedpassword,
            profile_pic: undefined,
            user_created: new Date(),
            updated: new Date()       
        })
        console.log("user added to db")

        const verificationToken = await generateVerificationToken(email)
        await sendVerificationEmail(verificationToken.email, verificationToken.token)
        return { success: true }

    } catch (error) {
        console.log(error)
        return { error: "Something went wrong!" }
    }
}

export const login = async (previousState, formData) => {
    const { username, password } = Object.fromEntries(formData)
    
    const client = await ConnectionDB
    const user = await client.db("credentials").collection("credentials").findOne({ "username": username })
    
    if (user && !user.emailVerified) {
        const verificationToken = await generateVerificationToken(user.email)
        await sendVerificationEmail(verificationToken.email, verificationToken.token)
        return { error: "Email not verified" }
    }

    try {
        await signIn("credentials", { username, password, redirectTo: "/home" })
    } catch (error) {
        console.log(error)
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return { error: "Invalid Username or Password" }
                case 'CallbackRouteError':
                    return { error: "Invalid Username or Password" }
                default:
                    return { error: "Something went wrong" }
            }
        }
        throw error
    }
}

