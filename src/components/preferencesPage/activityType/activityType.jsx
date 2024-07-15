"use client";

import { useRef, useState } from "react";
import Icons from "./Icons";

const ActivityType = () => {

    const [query, setQuery] = useState("");
    const [selected, setSelected] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);

    const inputRef = useRef(null);


    const tags = [
        "Active",
        "Leisure",
        "Shopping",
        "Sightseeing",
        "Food",
        "Adventure",
      ];

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
        <div className="bg-white h-40 mt-6 grid">

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
                        onBlur={() => setrMenuOpen(false)}
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
    )
}

export default ActivityType