import React, { useEffect, useState } from "react";
import Calendar from 'react-calendar'
import './Booking.css'



const Booking = ({ spot }) => {
    const date = new Date()
    const [checkin, setCheckin] = useState(date.toLocaleDateString())
    const [checkout, setCheckout] = useState(date.toLocaleDateString())
    const [dayTotal, setDayTotal] = useState(null)
    const [mountCalendar, setMountCalendar] = useState(false)

    const mount = () => {
        setMountCalendar(!mountCalendar)
    }

    useEffect(() => {
        const days = () => {
            let start = new Date(checkin)
            let end = new Date(checkout)
            let totalDays = (end.getTime() - start.getTime()) / (1000 * 3600 * 24)
            setDayTotal(totalDays)
        }
        days()
    }, [checkin, checkout])

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
            <button className="reserve">Reserve</button>
            <p>You won't be charged yet.</p>
            <div className="price">
                <div className="per-night">${spot.price} X {dayTotal} nights</div>
                <div className="subtotal">${spot.price * dayTotal}</div>
            </div>
            <div className="total">
                <div className="total-price">
                    <div>Total before taxes:</div>
                    <div className="subtotal">${spot.price * dayTotal}</div>
                </div>
            </div>
        </div>
    )

}

export default Booking
