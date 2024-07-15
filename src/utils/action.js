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

export const saveLocationToDB = async (location, email) => {
    const client = await ConnectionDB
    await client.db("places").collection("savedPlaces").findOneAndUpdate(
        { email: email },
        { $push: { locations: location } },
        { upsert: true }
    )
}

export const unsaveLocationDB = async (id, email) => {
    const client = await ConnectionDB
    await client.db("places").collection("savedPlaces").findOneAndUpdate(
        { email: email },
        { $pull: { locations: { id: id } } },
    )
}

export const locationSaved = async (id, email) => {
    const client = await ConnectionDB
    const location = await client.db("places").collection("savedPlaces").findOne({
        $and: [
            { email: email },
            { locations: { $elemMatch: { id: id } } }
        ]
    })
    if (location) return true
    return false
}

export const getSavedLocation = async (id, email) => {
    //query for user's saved location with id
    const query = {
        email: email,
        "locations.id": id             
    }

    //alternative to query or project for location Object by id in locations array
    // { locations: { $elemMatch: { id: id } } } 

    const options = {
        //include only matched location in returned document
        projection: {
            "locations.$": 1 
        }
    }
    
    const client = await ConnectionDB
    const location = await client.db("places").collection("savedPlaces").findOne(query, options)
    
    //return location Object from locations array
    return location?.locations?.[0]
}

export const createItinerary = async (email, selectedDates, previousState, formData) => {

    if (!selectedDates) return "Please select trip dates" 
    try {
        const { tripName } = Object.fromEntries(formData)
        const startDate = selectedDates[0]
        const endDate = selectedDates[1]

        const client = await ConnectionDB
        const days = []
        let date = new Date(startDate)
        const end = endDate

        for(let i = 0; date <= end; i++) {
            days[i] = {
                date: date.toDateString(),
                locations: []
            }
            date.setDate(date.getDate() + 1)
        }

        const trip = { 
            trip: tripName,
            startDate: startDate.toDateString(),
            endDate: endDate.toDateString(),
            days: days
        }

        //to be modified to include "place" param
        await client.db("places").collection("itinerary").findOneAndUpdate(
            { email: email },
            { $push: { trips: trip } },
            { upsert: true }  
        )

    } catch(error) {
        console.log(error)
        return "Something went wrong"
    }
    return "Itinerary created"
}

export const addLocationToItinerary = async (location, trip, email, date) => {
    const client = await ConnectionDB
    await client.db("places").collection("itinerary").findOneAndUpdate(
        { email: email, trips: { $elemMatch: { trip: trip, days: { $elemMatch: { date: date } } } } },
        { $push: { "trips.$.days.$[day].locations": location } },
        { arrayFilters: [ { "day.date": date }]}
    )
    await locationInItineraryByDate(location.id, email, date)
}

export const removeLocationFromItinerary = async (id, trip, email, date) => {
    const client = await ConnectionDB
    await client.db("places").collection("itinerary").findOneAndUpdate(
        { email: email, trips: { $elemMatch: { trip: trip, days: { $elemMatch: { date: date } } } } },
        { $pull: { "trips.$.days.$[day].locations": { id: id } } },
        { arrayFilters: [ { "day.date": date }]}
    )
}

export const locationInItinerary = async (id, email) => {
    const client = await ConnectionDB
    const location = await client.db("places").collection("itinerary").findOne({
            email: email,
            "trips.days.locations": { $elemMatch: { id: id } } 
    })
    if (location) return true
    return false
}

export const locationInItineraryByDate = async (id, trip, email, date) => {
    const client = await ConnectionDB
    const location = await client.db("places").collection("itinerary").findOne({
         email: email, trips: { $elemMatch: { trip: trip, days: { $elemMatch: { date: date , "locations.id": id } } } }
    })
    if (location) return true
    return false
}

export const getTrips =  async (email) => {
    const client = await ConnectionDB
    const trips = await client.db("places").collection("itinerary").findOne({
            email: email, 
    })
    //return array of trips
    return trips?.trips
}


