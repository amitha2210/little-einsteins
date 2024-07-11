// lib/mongodb.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;

export const getUserByEmail = async (email) => {
  client = await clientPromise
  const user = await client.db("credentials").collection("credentials").findOne({ "email": email})
  return user
}

export const getSavedLocations = async (email) => {
  client = await clientPromise
  const savedLocations = await client.db("places").collection("savedPlaces").findOne({ email: email})
  return savedLocations?.locations
}

export const getItinerary = async (email) => {
  client = await clientPromise
  const itinerary = await client.db("places").collection("itinerary").findOne({ email: email})
  return itinerary?.locations
}