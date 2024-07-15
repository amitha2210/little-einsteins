import React from 'react';
import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import styles from "./calendar.css"
function Dates() {
    return (
        <div className='dates-container'>
            <p className='text-xl text-[#00b4d8] font-semibold'>
                Travel dates:
            </p>
            <div className="dates">
                <DateRangePicker />

            </div>
        </div>
    );
}

export default Dates;