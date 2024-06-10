"use server"

import { getVerificationTokenByToken } from "./verification"
import connectionToDB from "../mongodb"
import { getUserByEmail } from "../mongodb"

export const verifyEmail = async (token) => {
    const existingToken = await getVerificationTokenByToken(token)

    if (!existingToken) {
        return { error: "Token does not exist!"}
    }

    const tokenExpired = existingToken.expiry < new Date()

    if (tokenExpired) {
        return { error: "Token has expired!"}
    }

    const client = await connectionToDB
    const user = getUserByEmail(existingToken.email)

    if(!user) {
        return { error: "Email does not exist!" }
    }

    //change user to email-verified
    await client.db("credentials").collection("credentials")
    .updateOne(
        { "email": existingToken.email },
        { $set: { emailVerified: true }}
    )

    //delete tokens 
    // await client.db("credentials").collection("verificationToken")
    // .deleteMany({ "email": existingToken.email })

    return { success: "Email verified!" }
}