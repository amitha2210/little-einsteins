"use server"
import { getPasswordResetTokenByToken } from "./reset"
import connectionToDB from "../mongodb"
import { getUserByEmail } from "../mongodb"
import bcryptjs from "bcryptjs"
import { generatePasswordResetToken, sendPassWordResetEmail } from "./reset"

export const resetPassword = async (token, previousState, formData) => {
    const { password, passwordAgain } = Object.fromEntries(formData)

    if (password !==passwordAgain) {
       return { error: "Passwords do not match!" }
    }

    const existingToken = await getPasswordResetTokenByToken(token)

    if (!existingToken) {
        return { error: "Token does not exist!"}
    }

    const tokenExpired = existingToken.expiry < new Date()

    if (tokenExpired) {
        return { error: "Token has expired!"}
    }

    const client = await connectionToDB
    const user = await getUserByEmail(existingToken.email)

    if(!user) {
        return { error: "Email does not exist!" }
    }
    
    const salt = await bcryptjs.genSalt(10)
    const hashedpassword = await bcryptjs.hash(password, salt)

    //change user to email-verified
    await client.db("credentials").collection("credentials")
    .updateOne(
        { "email": existingToken.email },
        { $set: { password: hashedpassword }}
    )

    //delete tokens 
    await client.db("credentials").collection("passwordResetToken")
    .deleteMany({ "email": existingToken.email })

    return { success: "Password Changed!" }
}

export const resetPasswordEmail = async (previousState, formData) => {
    const { email } = Object.fromEntries(formData)

    const existingUser = await getUserByEmail(email)
    console.log(existingUser)
    if (!existingUser) {
        return { error: "Email not found!" }
    }
    const passwordResetToken = await generatePasswordResetToken(email)
    await sendPassWordResetEmail(passwordResetToken.email, passwordResetToken.token)
    return { success: "Reset Email sent" }
}