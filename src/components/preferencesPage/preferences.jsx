"use client";

import { useRef, useState } from "react";
import React from 'react';
import Icons from "./Icons";
import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import styles from "./preferences.css"
import { storePreferences, createItinerary2 } from "@/utils/action";
import generateText from "@/utils/gemini2"
import { useFormState } from "react-dom"


const Preferences = ({session}) => {
t
    const [inputText, setInputText] = useState('');
    const [budget, setBudget] = useState(0);
    const [dateRange, setDateRange] = useState([null, null]);
    const [query, setQuery] = useState("");
    const [selected, setSelected] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);
    const inputRef = useRef(null);
    const [state, formAction] = useFormState(generateText, "")
    const email = session?.user?.email;


    const tags = [
        "Active",
        "Leisure",
        "Shopping",
        "Sightseeing",
        "Food",
        "Adventure",
      ];
    
    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission if needed
        alert(`Submitted text: ${inputText}`);
    };

    const handleDateChange = (range) => {
        setDateRange(range);
        console.log('Date Range Changed: ', range);
    };
    
    const handleSave = () => {
        const [startDate, endDate] = dateRange;
        console.log('Saving Preferences:', { inputText, startDate, endDate, activities: selected });
        storePreferences({ inputText, startDate, endDate, activities: selected }, session?.user?.email);
    };

    const makeString = (destination, start, end, types) => {
        let startDate;
        let endDate;
        if (start instanceof Date) startDate = start.toDateString();
        if (end instanceof Date) endDate = end.toDateString();

        const activitiesString = types.join(', ');

        return `Plan an itinerary from ${startDate} to ${endDate} to ${destination} based on these preferences: ${activitiesString}. 
                List the itinerarys for different days using this JSON schema:
                { "type": "object",
                "properties": {
                    "days": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "date": {
                            "type": "date",
                            "format": "date",
                            "description": "The date of the itinerary day."
                          },
                          "locations": {
                            "type": "array",
                            "items": {
                              "type": "object",
                              "properties": {
                                "location": {
                                  "type": "string",
                                  "description": "Name of the location"
                                },
                                "startTime": {
                                    "type": "date",
                                    "description": "Time of visit"
                                },
                                "endTime": {
                                    "type": "date",
                                    "description": "Time of departure"
                                },
                              },
                              "required": ["startTime", "endTime", "location"]
                            }
                          }
                        },
                        "required": ["date", "locations"]
                      }
                    }
                  },
                  "required": ["days"]
                }}`;
    }

    async function search(location) {

        if (!map) return
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
            textQuery: location,
            locationBias: japanBounds,
            language: "en",
            maxResultCount: 10
        }
    }


    const handleGenerate = async (destination, start, end, types) => {

        const geminiString = makeString(destination, start, end, types)
        const generatedText = await generateText(geminiString);
        const dates = [start, end];
        await createItinerary2(session.user.email, dates, destination);
        generateText.days.map(day => 
            day.locations.map(location => search(location))
          );
        console.log('Generated Itinerary String:', generatedText);
    }


    const filteredTags = tags.filter((item)=> 
        item?.toLocaleLowerCase()?.includes(query.toLocaleLowerCase()?.trim()) && 
    !selected.includes(item)
    )   ;

    const isDisable = 
        !query?.trim() || 
        selected.filter(
            (item) => 
                item?.toLocaleLowerCase()?.trim() === query?.toLocaleLowerCase()?.trim()
        )?.length;

    return (
        <div>
            <div style={{ width: '300px', margin: '50px' }}>
                <form onSubmit={handleSubmit} className='form-container'>
                    <label htmlFor="inputText" className='text-xl text-[#00b4d8] font-semibold'>Enter your destination</label>
                    <br />
                    <input
                        type="text"
                        id="inputText"
                        className='input-with-grey-outline'
                        value={inputText}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '8px', margin: '10px 0' }}
                    />
                    <button 
                    type="submit" 
                    style={{ 
                        padding: '8px 12px', 
                        backgroundColor: '#00b4d8', 
                        color: '#fff', 
                        border: 'none', 
                        borderRadius: '4px' }}
                    >
                        Confirm
                    </button>
                    
                </form>
            </div>

        
            <div style={{margin: '50px'}} className='dates-container'>
                <p className='text-xl text-[#00b4d8] font-semibold'>
                    Travel dates:
                </p>
                <div className="dates">
                    <DateRangePicker 
                        onChange={handleDateChange}
                        value={dateRange}
                    />

                </div>
            
            </div>

            <div style={{margin: '50px'}} className="bg-white h-40 mt-6 grid">

                <p className="text-xl text-[#00b4d8] font-semibold">Types of activities</p>

                <div className="relative w-80 h-96 text-sm">
                    {selected?.length ? (
                        //selects options
                        <div className="bg-white w-80 relative text-xs flex flex-wrap gap-1 p-2 mb-2">
                            {selected.map((tag)=> {
                                return <div key={tag} className="rounded-full w-fit py-1.5 px-3 border border-[#00b4d8] bg-gray-50 text-gray-500
                                flex items-center gap-2">
                                    {tag}
                                    <div 
                                        onMouseDown={(e) => e.preventDefault()} 
                                        onClick={()=> 
                                            setSelected(selected.filter((i) => i !== tag))
                                        }
                                    >
                                        <Icons.Close />
                                    </div>
                                </div>;
                            })}
                            <div className="w-full text-right">
                                <span 
                                    className="text-gray-400 cursor-pointer" 
                                    onClick={() => {
                                        setSelected([]);
                                        inputRef.current?.focus();
                                    }}
                                    >
                                    Clear all
                                </span>
                            </div>

                    </div>) : null}
                <div className="card flex items-center justify-between p-3 w-80 gap-2.5">
                    <Icons.Search />
                    <input 
                        ref={inputRef}
                        type="text" 
                        value={query} 
                        onChange={(e) => setQuery(e.target.value.trimStart())} 
                        placeholder="Add"
                        className="bg-transparent text=sm flex-1 caret-rose-600"
                        onFocus={() => setMenuOpen(true)}
                        onBlur={() => setMenuOpen(false)}
                        onKeyDown={(e)=> {
                            if(e.key === 'Enter' && !isDisable) {
                                setSelected((prev)=> [...prev, query]);
                                setQuery("");
                                setMenuOpen(true);
                            }
                        }}
                    />
                    <button 
                        className="text-sm disable:text-grey-300 text-[#00b4d8] disabled:cursor-not-allowed" 
                        disabled={isDisable}
                        //to add other options
                        onClick={() => {
                            if(isDisable) {
                                return;
                            }
                            setSelected((prev)=> [... prev, query]);
                            setQuery("");
                            inputRef.current?.focus();
                        }}
                    >
                        + Add
                    </button>
                </div >


                {/* Menu's */}
                {menuOpen ? (
                    <div className="card absolute w-full max-h-24 mt-2 p-1 flex overflow-y-auto scrollbar-thin scrollbar-track-slate-50 scrollbar-thumb-slate-200">
                        <ul className="w-full">
                            {filteredTags?.length ? filteredTags.map((tag, i) => (
                                <li 
                                key={tag} 
                                className="p-2 cursor-pointer hover:bg-[#00b4d8] rounded-md w-full"
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={()=> {
                                    setMenuOpen(true);
                                    setSelected((prev) => [...prev,tag]);
                                    setQuery("");
                                }}>
                                    {tag}
                                </li>
                            )):(
                               <li className="p-2 text-gray-500">No options available</li> 
                            )}
                        </ul>
                    </div> 
                ): null}
            </div>
        </div>
            <div className="flex mt-1 justify-center">
                    <button
                        type="submit"
                        style={{
                            padding: '8px 12px',
                            backgroundColor: '#00b4d8',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px'}}
                            onClick={() => handleGenerate(inputText, dateRange[0], dateRange[1], selected)} >
                                Generate Itinerary
                    </button>
                    
            </div>  
        </div>
    )

}


export default Preferences

/* <div> <pre className="overflow-x-auto whitespace-pre-wrap">
                <form action={formAction} className="mt-[8rem]">
                    <input type="text" placeholder="Input prompt" name="prompt" required />
                    <button type="submit">Generate Itinerary</button>
                    {state}           
                </form> 
                </pre>
            </div> 
            */