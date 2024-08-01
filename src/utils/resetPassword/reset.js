import { v4 as uuidv4 } from "uuid"
import connectionToDB from "../mongodb"
import { Resend } from "resend"

export const getPasswordResetTokenByToken = async (token) => {
    const client = await connectionToDB
    const passwordResetToken = await client.db("credentials").collection("passwordResetToken")
    .findOne({ "token": token })
    
    return passwordResetToken
}

export const generatePasswordResetToken = async (email) => {

    const token = uuidv4()
    const expiry = new Date(Date.now() + 3600 * 1000)
    const PasswordResetToken = {
        email: email,
        token: token,
        expiry: expiry
    }

    const client = await connectionToDB
    await client.db("credentials").collection("passwordResetToken")
    .replaceOne({ "email": email }, PasswordResetToken, { upsert: true })
    
    return PasswordResetToken
}

export const sendPassWordResetEmail = async (email, token) => {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const confirmationLink = `http://localhost:3000/reset-password?token=${token}`

    await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: email,
        subject: 'Reset your password',
        html: `<p>Click <a href="${confirmationLink}"/>here to reset password.<p>`
      })

}
