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
    await signOut({redirectTo: "/"}) 
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
        const user = await client.db("credentials").collection("credentials").findOne({ "username": username.trim() })
        if (user) {
            return { error: "Username already exists" }
        }
        await client.db("credentials").collection("credentials").insertOne({
            username: username.trim(),
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
        await signIn("credentials", { username, password, redirectTo: "/" })
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

export const getUserByEmail = async (email) => {
    const client = await ConnectionDB
    const user = await client.db("credentials").collection("credentials").findOne(
        { "email": email},
        { projection: { "_id": 0 } }
    )
    console.log(user)
    return user
}

export const updateUsername = async (email, previousState, formData) => {
    const { username } = Object.fromEntries(formData)

    const client = await ConnectionDB
    try {
        
        const user = await client.db("credentials").collection("credentials").findOne({ "username": username })

        if (user) {
            return { error: "Username already exists" }
        }

        await client.db("credentials").collection("credentials").findOneAndUpdate(
            { email: email },
            { $set: { username: username, updated: new Date() }}
        )

        return { success: "username changed" }

    } catch (error) {
        console.log(error)
        return { error: "Something went wrong" }
    }
}

export const updatePassword = async (email, previousState, formData) => {
    const { password, passwordAgain } = Object.fromEntries(formData)
    
    if (password !==passwordAgain) {
        return { error: "Passwords do not match!" }
    }
    
    const user = await getUserByEmail(email)
    const samePassword = await bcryptjs.compare(password, user.password)

    if (samePassword) {
        return { error: "Please enter a new password" }
    }
 
    const salt = await bcryptjs.genSalt(10)
    const hashedpassword = await bcryptjs.hash(password, salt)
 
    try {
        const client = await ConnectionDB

        await client.db("credentials").collection("credentials").findOneAndUpdate(
            { email: email },
            { $set: { password: hashedpassword, updated: new Date() }}
        )
        return { success: "password changed" }
 
     } catch (error) {
        console.log(error)
        return { error: "Something went wrong!" }
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

export const getSavedLocations = async (email) => {
    const client = await ConnectionDB
    const savedLocations = await client.db("places").collection("savedPlaces").findOne({ email: email})
    return savedLocations?.locations
}
  
export const createItinerary = async (email, selectedDates, previousState, formData) => {

    if (!selectedDates) return { message: "Please select trip dates" } 
    try {
        const { tripName } = Object.fromEntries(formData)
        const trimName = tripName.trim()
        const formattedtripName = trimName.charAt(0).toUpperCase() + trimName.slice(1)
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
            trip: formattedtripName,
            startDate: startDate.toDateString(),
            endDate: endDate.toDateString(),
            days: days
        }
o
        const trips = await client.db("places").collection("itinerary").findOneAndUpdate(
            { email: email },
            { $push: { trips: trip } },
            { 
                upsert: true,
                returnDocument: "after"
            }  
        )
        
        return { 
            message: "Itinerary created",
            tripName: formattedtripName,
            trips: trips?.trips
        }

    } catch(error) {
        console.log(error)
        return { message: "Something went wrong"}
    }
}

export const createItinerary2 = async (email, selectedDates, tripName) => {

    if (!selectedDates) return { message: "Please select trip dates" } 
    try {
        const trimName = tripName.trim()
        const formattedtripName = trimName.charAt(0).toUpperCase() + trimName.slice(1)
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
            trip: formattedtripName,
            startDate: startDate.toDateString(),
            endDate: endDate.toDateString(),
            days: days
        }
o
        const trips = await client.db("places").collection("itinerary").findOneAndUpdate(
            { email: email },
            { $push: { trips: trip } },
            { 
                upsert: true,
                returnDocument: "after"
            }  
        )
        
        return { 
            message: "Itinerary created",
            tripName: formattedtripName,
            trips: trips?.trips
        }

    } catch(error) {
        console.log(error)
        return { message: "Something went wrong"}
    }
}

export const removeTripFromDB = async (tripName, email) => {
    const client = await ConnectionDB
    const location = await client.db("places").collection("itinerary").findOneAndUpdate(
        { email: email, trips: { $elemMatch: { trip: tripName } } },
        { $pull: { "trips": { trip: tripName  } } },
        { returnDocument: "after" }
    )
    return location?.trips
}


export const addLocationToItinerary = async (location, trip, email, date) => {
    const locationWithTime = { 
        startTime: new Date(date),
        endTime: new Date(date),
        ...location
    }

    console.log(locationWithTime)
    const client = await ConnectionDB
    const itinerary = await client.db("places").collection("itinerary").findOneAndUpdate(
        { email: email, trips: { $elemMatch: { trip: trip, days: { $elemMatch: { date: date } } } } },
        { $push: { "trips.$.days.$[day].locations": locationWithTime } },
        { arrayFilters: [ { "day.date": date }] }
    )
    //await setLocationItineraryTime(location.id, trip, email, date)
    return { trip: trip }
}

export const removeLocationFromItinerary = async (id, trip, email, date) => {
    const client = await ConnectionDB
    await client.db("places").collection("itinerary").findOneAndUpdate(
        { email: email, trips: { $elemMatch: { trip: trip, days: { $elemMatch: { date: date } } } } },
        { $pull: { "trips.$.days.$[day].locations": { id: id } } },
        { arrayFilters: [ { "day.date": date }]}
    )
    return { trip: trip }
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

export const locationInItineraryByTrip = async (id, trip, email) => {
    const client = await ConnectionDB
    const location = await client.db("places").collection("itinerary").findOne({
         email: email, trips: { $elemMatch: { trip: trip, days: { $elemMatch: { "locations.id": id } } } }
    })
    if (location) return true
    return false
}

export const setLocationItineraryTime = async (id, trip, email, date, previousState, formData) => {
    
    const { startTime, endTime } = Object.fromEntries(formData)
    const newStartDate = new Date(date)
    newStartDate.setHours(startTime.slice(0, 2), startTime.slice(3, 5))

    const newEndDate = new Date(date)
    newEndDate.setHours(endTime.slice(0, 2), endTime.slice(3, 5))

    const client = await ConnectionDB
    const location = await client.db("places").collection("itinerary").findOneAndUpdate(
    {
        email: email, 
        trips: { 
            $elemMatch: { 
                trip: trip, 
                days: { 
                    $elemMatch: { 
                        date: date, 
                        locations: {
                            $elemMatch: {
                                id: id
                            }
                        } 
                    } 
                } 
            } 
        }
    },
    {
        $set: {
            "trips.$.days.$[day].locations.$[location].startTime": newStartDate,
            "trips.$.days.$[day].locations.$[location].endTime": newEndDate,
        }
    },
    {
        arrayFilters: [
            { "location.id": id }, { "day.date": date }
        ]
    })
    return { trip: trip }
}

export const changeLocationDateItinerary = async (location, trip, email, currDate, newDate) => {
    
    location.startTime = new Date(newDate)
    location.endTime = new Date(newDate)

    await removeLocationFromItinerary(location.id, trip, email, currDate)
    await addLocationToItinerary(location, trip, email, newDate)
        
    return { trip: trip }
}

export const getTrips =  async (email) => {
    const client = await ConnectionDB
    const trips = await client.db("places").collection("itinerary").aggregate([
        {
            $match: { email: email }
        }, {
            $project: {
                trips: {
                    $map: {
                        input: "$trips",
                        as: "trip",
                        in: {
                            trip: "$$trip.trip",
                            startDate: "$$trip.startDate",
                            endDate: "$$trip.endDate",
                            days: {
                                $map: {
                                    input: "$$trip.days",
                                    as: "day",
                                    in: {
                                        date: "$$day.date",
                                        locations: {
                                            $sortArray: {
                                                input: "$$day.locations",
                                                sortBy: { startTime: 1 }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    ]).toArray()
    //const sortedTrips = trips?.[0]?.trips?.sort((a, b) => new Date(a.startDate) - new Date(b.startDate))

    //return array of trips with locations array sorted by time
    return trips?.[0]?.trips
}

export const findTripCoverPic = async (email, trip) => {
    const client = await ConnectionDB
    const query = {
        email: email,  
    }             
    
    const options = {
        projection: {
            trips: {
                $elemMatch: {
                    trip: trip,
                    days: {
                        $elemMatch: {
                            locations: { $ne: [] }
                        }
                    }
                }
            }            
        }
    }
    // const trips = await client.db("places").collection("itinerary").findOne(query, options)
    // console.log(trips)
    // const location = trips?.trips?.[0]?.days.filter((day) => day.locations.length != 0)
    // console.log(location?.[0]?.locations?.[0])
    const location = await client.db("places").collection("itinerary").aggregate([
        {
            $match: { email: email, "trips.trip": trip }
        }, {
            $project: {
                trips: {
                    $filter: {
                        input: "$trips",
                        as: "trip",
                        cond: { $eq: ["$$trip.trip", trip]}
                    }
                }
            }
        }, {
            $project: {
                trips: {
                    $map: {
                        input: "$trips",
                        as: "trip",
                        in: {
                            trip: "$$trip.trip",
                            days: {
                                $filter: {
                                    input: "$$trip.days",
                                    as: "days",
                                    cond: { $ne: ["$$days.locations", []]}
                                }
                            }
                        }
                    }
                }   
            }
        }
    ]).toArray()

    return location[0].trips[0].days[0]?.locations?.[0]?.placeImg

}

export const storePreferences = async (location, startDate, endDate, email) => {
    const client = await ConnectionDB
    const info = {
        locations: location
    }
    await client.db("preferences").collection("preferences").findOneAndUpdate(
        { email: email },
        { $push: { information: info}},
        { upsert: true }
    )
}


