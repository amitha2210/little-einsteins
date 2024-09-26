# TravelGenie
Welcome to TravelGenie - an AI-powered travel planner. This application leverages AI
to help users create personalised travel itineraries based on their preferences,
such as acitivies and duration of the trip.

## Table of Contents
* Overview [Link Text](#overview).
* Features [Link Text](#features).
* Installation [Link Text](#installation).
* Usage [Link Text](#usage).
* Tech Stack [Link Text](#tech-stack).
* Contributors [Link Text](#contributors).

## Overview
TravelGenie is designed to streamline the process of planning a trip by suggesting itineraries 
based on user inputs such as budget, interests, and destination. 
Whether you're planning a weekend getaway or an international adventure, the AI travel planner 
helps you find the best recommendations so you do not have to worry about searching for places to visit.

## Features
* User account: Create accounts so that users can save their travel plans and access it across multiple devices.
* Travel planner: Plan multiple trips in one place and easily edit itineraries.
* AI-generated itinerary: Uses AI tools to generate a personalised itinerary based on user preferences.
* Search Functionality: Users can explore places of interest and add to their itinerary.

## Quick Start
### Prerequisites
Make sure you have the following installed on your machine:
* Node.js
* npm (Node Package Manager)

### Clone the repository
`git clone https://github.com/amitha2210/little-einsteins.git`

### Navigate to the project directory
`cd little-einsteins`

### Installation
Install project dependencies using npm:
`npm install`

### Set up environment variables
Create a new file named .env in the root of your project directory and add the following:
```
MONGODB_URI=

AUTH_SECRET=

AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=

RESEND_API_KEY=

GEMINI_API_KEY=

NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
```
* Add your API keys from **Google Cloud**, **Resend**, and **MongoDB**.
* Add AUTH_SECRET by running `openssl rand -base64 32`

### Running the project
`npm run dev`

## Usage
1. Create an account using email or using Google.
2. Generate an itinerary by entering preferences such as activities.
3. Further customise the itinerary by removing or adding places of interest.
3. Alternatively, start planning a trip by entering trip name and dates.
4. Add places of interest to itinerary.

## Tech Stack
* NextJs
* React
* MongoDB
* NextAuth
* Google Maps
* Gemini
* Resend
* Tailwind CSS

## Project Roadmap
### Completed
* User accounts for multi-device access
* Travel planner to enable easy viewing and editing of itinerary 
* AI-generated itinerary based on user preferences
* Search functionality to explore places of interest
* Maps functionality to view location

### Future plans
* Real-time collaboration for planning of trips
* Expense tracker for user and group trips

## Contributors
@gladwintan
@amitha2210