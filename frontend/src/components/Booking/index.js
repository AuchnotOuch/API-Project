import React, { useState } from "react";
import Calendar from 'react-calendar'
import './Booking.css'



const Booking = ({ spot }) => {
    const date = new Date()
    const [checkin, setCheckin] = useState(date.toLocaleDateString())
    const [checkout, setCheckout] = useState(date.toLocaleDateString())
    const [mountCalendar, setMountCalendar] = useState(false)

    const mount = () => {
        setMountCalendar(!mountCalendar)
    }

    return (
        <div className='book-spot'>
            <div className='book-header'>
                <div>
                    ${spot.price} nightly
                </div>
                <div>
                    <div><i className="fa-solid fa-star"></i> {Math.round(spot.avgStarRating * 100) / 100 || 'No Ratings'}</div>
                </div>
            </div>
            <button id="date-select-button">
                <div className='date-select'>
                    <div className="check-in">
                        <div className="check-in-header">CHECK-IN</div>
                        <div className="date">{checkin}</div>
                    </div>
                    <div className="check-out">
                        <div className="check-out-header">CHECK-OUT</div>
                        <div className="date">{checkout}</div>
                    </div>
                </div>
            </button>
        </div>
    )

}

export default Booking
