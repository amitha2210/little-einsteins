import { v4 as uuidv4 } from "uuid"
import connectionToDB from "../mongodb"
import { Resend } from "resend"

const getVerificationTokenByEmail = async (email) => {
    const client = await connectionToDB
    const verificationToken = await client.db("credentials")
                                            .collection("verificationToken")
                                            .findOne({ "email": email })
    
    return verificationToken
}

export const getVerificationTokenByToken = async (token) => {
    const client = await connectionToDB
    const verificationToken = await client.db("credentials")
                                            .collection("verificationToken")
                                            .findOne({ "token": token })
    
    return verificationToken
}

export const generateVerificationToken = async (email) => {

    const token = uuidv4()
    const expiry = new Date(Date.now() + 3600 * 1000)
    const verificationToken = {
        email: email,
        token: token,
        expiry: expiry
    }

    const client = await connectionToDB
    await client.db("credentials")
                .collection("verificationToken")
                .replaceOne({ "email": email }, verificationToken, { upsert: true })
    
    return verificationToken
}

export const sendVerificationEmail = async (email, token) => {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const confirmationLink = `http://localhost:3000/verification?token=${token}`

    await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: email,
        subject: 'Confirm your email',
        html: `<p>Click <a href="${confirmationLink}">here< /a> to verify email for TravelGenie.<p>`
    })

}