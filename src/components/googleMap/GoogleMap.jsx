"use client"
import { useEffect, useRef, useState } from "react"
import { useJsApiLoader } from "@react-google-maps/api"
import mapIcon from "@/assets/map.svg"
import mapIconColoured from "@/assets/map-coloured.svg"
import radioButtonUnchecked from "@/assets/radiobutton-unchecked.svg"
import radioButtonChecked from "@/assets/radiobutton-checked.svg"
import searchIcon from "@/assets/search.svg"
import explorePageBg from "@/assets/explore-page-background.jpg"

import Image from "next/image"
import SearchCard from "./SearchCard"

const lib = ["core", "maps", "places", "marker"]

const GoogleMap = ({ session }) => {
    
    let marker;
    const mapRef = useRef(null)
    const autoCompleteRef = useRef(null)
    const textSearchRef = useRef(null)

    const [map, setMap] = useState(null)
    const [autoComplete, setAutoComplete] = useState(null)
    const [selectedPlace, setSelectedPlace] = useState(null)
    const [searchResult, setSearchResult] = useState(null)
    const [open, openMap] = useState(null)
    const [searchAny, setSearchAny] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const [lastSearchQuery, setLastSearchQuery] = useState("")

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value)
    }

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        version: "beta",
        libraries: lib
    })

    useEffect(() => {
        if (isLoaded) {
            const position = {
                lat: 35.68148944061189, 
                lng: 139.7669914983956
            }

            //map options
            const mapOptions = {
                center: position,
                zoom: 12,
                mapId: "myApp"
            }

            //setup map
            const map = new google.maps.Map(mapRef.current, mapOptions)
            setMap(map)

            //map bounds
            const japanBounds = new google.maps.LatLngBounds(
                new google.maps.LatLng({
                    lat: 34.925910778668744, 
                    lng: 138.24859834647026
                }),
                new google.maps.LatLng({
                    lat: 36.14655591375202, 
                    lng: 139.87042995969628
                })
                
            );

            const placeAutocomplete = new google.maps.places.PlaceAutocompleteElement({
                locationRestriction: japanBounds,
                componentRestrictions: {
                    country: ["jp"]
                }
            });

            setAutoComplete(placeAutocomplete)
            autoCompleteRef.current.appendChild(placeAutocomplete)
        }
    }, [isLoaded])

    useEffect(() => {
        if (autoComplete) {
            autoComplete.addEventListener("gmp-placeselect", async ({ place }) => {
                await place.fetchFields({
                    fields: [
                        "displayName", 
                        "editorialSummary", 
                        "formattedAddress", 
                        "googleMapsURI", 
                        "location", 
                        "photos", 
                        "rating", 
                        "userRatingCount",
                        "regularOpeningHours"
                    ],
                });
                setSelectedPlace(place)
                setMarker(place.location, place.displayName)
            })
        }
    }, [autoComplete])

    function setMarker(location, name) {
        console.log(map)
        if (!map) return
        map.setCenter(location)
        const pin = new google.maps.marker.PinElement({
            scale: 1.3,
            background: "#00b4d8",
            glyphColor: "#91d7e6",
            borderColor: "#0493b0",
        })
        const init = '<div style="background-color:white"> Hello </div>'

        if (marker?.map) {
            marker.map = null
        }

        marker = new google.maps.marker.AdvancedMarkerElement({
            map: map,
            position: location,
            content: pin.element,
        })

        // const infoCard = new google.maps.InfoWindow({
        //     position: location,
        //     content: buildMapInfoCardContent(name, name),
        //     maxWidth: 200
        // })

        // infoCard.open({
        //     map: map,
        //     anchor: marker
        // })
    }

    function buildMapInfoCardContent(title, body) {
        return `
            <div>
                Title
                ${title}
                ${body}
            </div>
        )`
    }

    async function search() {

        if (!map) return
        if (lastSearchQuery == searchQuery) return
        setLastSearchQuery(searchQuery)
        const japanBounds = new google.maps.LatLngBounds(
            new google.maps.LatLng({
                lat: 34.925910778668744, 
                lng: 138.24859834647026
            }),
            new google.maps.LatLng({
                lat: 36.14655591375202, 
                lng: 139.87042995969628
            })    
        )

        //search request
        const textSearchRequest =  {
            fields: [
                "displayName", 
                "editorialSummary", 
                "formattedAddress", 
                "googleMapsURI", 
                "location", 
                "photos", 
                "rating", 
                "userRatingCount", 
                "regularOpeningHours"
            ],
            textQuery: searchQuery,
            locationBias: japanBounds,
            language: "en",
            maxResultCount: 3
        }

        //setup search
        const { places } = await google.maps.places.Place.searchByText(textSearchRequest)
        setSearchResult(Object.values(places))
    }

    function viewOnMap(location) {
        setMarker(location, "here")
        openMap(true)
    }

    return (
        <div className="flex">
            <div className={`${open ? "w-7/12" : "w-full"} flex flex-col items-center justify-center`}>
                <div className={`${(!selectedPlace && !searchResult) ? "h-[calc(100vh-6rem)]" : "h-full"} relative w-full items-center justify-center flex flex-col p-10 py-20`}>
                    <Image 
                        src={explorePageBg} 
                        fill
                        style={{ opacity: "90%", objectFit: "cover" }}
                        alt="background image" 
                        className="-z-50"
                    />
                        
                    <p className="text-4xl text-[#00b4d8] font-semibold p-5 -skew-y-1 bg-white rounded-2xl">
                        Explore Travel Destinations
                    </p>
                    
                    <div className="relative flex items-center justify-center space-x-12 mt-8">
                                    
                        <div className={`${searchAny ? "" : "hidden"} flex space-x-4`}>
                            <input type="text" onChange={handleInputChange} placeholder="Enter any location" className="p-3 w-[20rem] shadow-md border-2 rounded-3xl placeholder:text-center" ref={textSearchRef} />
                            <button 
                                onClick={() => search()} 
                                className="p-3 shadow-lg bg-white border border-slate-100 rounded-full"
                            >
                                <Image src={searchIcon} alt="search icon"/>
                            </button>
                        </div>
                        
                        <div className={`${searchAny ? "hidden" : "relative"} bg-white w-[20rem] right-6 shadow-lg`} ref={autoCompleteRef} />
                        
                        <button 
                            onClick={() => openMap(!open)} 
                            className="p-3 shadow-lg bg-white border border-slate-100 rounded-full"
                        >
                            {open ?
                                <Image src={mapIconColoured} height={28} width={28} alt="map icon coloured"/> 
                                : 
                                <Image src={mapIcon} height={24} width={24} alt="map icon"/> 
                            }
                        </button>

                    </div>
            
                    <div className="flex text-sm space-x-3 mt-6 justify-center"> 
                        
                        <button 
                            onClick={() => setSearchAny(true)} 
                            className="flex p-4 shadow-lg bg-white border border-slate-100 rounded-full items-center space-x-2"
                        >
                            <span>Search Anything</span>
                            <Image 
                                src={searchAny ? radioButtonChecked : radioButtonUnchecked} 
                                height={18} 
                                width={18} 
                                alt="radio button"
                            />
                        </button>
                        
                        <button 
                            onClick={() => setSearchAny(false)} 
                            className="flex p-4 shadow-lg bg-white border border-slate-100 rounded-full items-center space-x-2"
                        >
                            <span>By location address</span>
                            <Image src={searchAny ? radioButtonUnchecked : radioButtonChecked} height={18} width={18} alt="radio button"/>
                        </button>

                    </div>
                </div>

                {selectedPlace &&
                    <div className={`${searchAny ? "hidden" : ""} text-slate-600 flex w-full min-w-[30rem] justify-center`}>
                        <div className={`${open ? "w-9/12" : "w-7/12" } relative`}>
                            
                            <SearchCard 
                                id={selectedPlace.id}
                                name={selectedPlace.displayName}
                                address= {selectedPlace.formattedAddress}
                                description={selectedPlace.editorialSummary || "Description not Available"}
                                rating={selectedPlace.rating || "No ratings yet"}
                                userRatingCount={selectedPlace.userRatingCount}
                                googleMapLink={selectedPlace.googleMapsURI}
                                regularOpeningHours={selectedPlace.regularOpeningHours?.weekdayDescriptions || "Opening hours not available"}
                                placeImg={selectedPlace.photos?.[0]?.getURI()}
                                latLng={selectedPlace.location.toJSON()} 
                                session={session}
                                viewOnMap={viewOnMap}
 
                            />
                        </div>                       
                    </div>
                }

                {searchResult?.map((result, index) => (
                    <div key={index} className={`${searchAny ? "" : "hidden"} text-slate-600 flex w-full min-w-[30rem] justify-center`}>
                        <div className={`${open ? "w-11/12" : "w-7/12" } min-w-[37rem]`}>
                            
                            <SearchCard
                                id={result.id}
                                name={result.displayName}
                                address= {result.formattedAddress}
                                description={result.editorialSummary || "Description not Available"}
                                rating={result.rating || "No ratings yet"}
                                userRatingCount={result.userRatingCount}
                                googleMapLink={result.googleMapsURI}
                                regularOpeningHours={result.regularOpeningHours?.weekdayDescriptions || "Opening hours not available"}
                                placeImg={result.photos?.[0]?.getURI()} 
                                latLng={result.location.toJSON()} 
                                session={session}
                                viewOnMap={viewOnMap}
                            />

                        </div>                       
                    </div>
                ))}
            </div>
            
            {(isLoaded) ? 
                <div className={`${open ? "" : "hidden"} w-5/12`}>
                    <div className={`${open ? "sticky top-[6rem]" : "hidden"} h-[calc(100vh-6rem)]`}>
                        <div className="h-full w-full shadow-md border-none" ref={mapRef} /> 
                    </div>
                </div>
                : 
                <p>Loading...</p>
            }
        </div>
    )
}

export default GoogleMap