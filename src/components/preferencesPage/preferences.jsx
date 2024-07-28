"use client";

import { useRef, useState } from "react";
import React from 'react';
import Icons from "./Icons";
import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import styles from "./preferences.css"
import { storePreferences } from "@/utils/action";
import generateText from "@/utils/gemini2"
import { useFormState } from "react-dom"


const Preferences = ({session}) => {

    const [inputText, setInputText] = useState('');
    const [budget, setBudget] = useState(0);
    const [dateRange, setDateRange] = useState([null, null]);
    const [query, setQuery] = useState("");
    const [selected, setSelected] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);
    const inputRef = useRef(null);
    const [state, formAction] = useFormState(generateText, "")


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
        if (start instanceof Date) startDate = startDate.toLocaleDateString();
        if (endDate instanceof Date) endDate = endDate.toLocaleDateString();

        const activitiesString = types.selected.join(', ');

        return 'Plan an itinerary from ${startDate} to ${endDate} to ${destination} based on these preferences: ${activitiesString}`;'
    }

    const handleGenerate = (destination, start, end, types) => {
        generateText
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
                                    setSelected((prev) => [... prev,tag]);
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
        <div className="flex justify-center">
            <button 
                type="submit" 
                style={{ 
                    padding: '8px 12px', 
                    backgroundColor: '#00b4d8', 
                    color: '#fff', 
                    border: 'none', 
                    borderRadius: '4px' }}
                    onClick={handleSave}>
                        Save
                </button>
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
                            onClick={handleGenerate} >
                                Generate Itinerary
                    </button>
            </div>  
        </div>
    )
    const geminiString = makeString(inputText, startDate, endDate, activities)

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