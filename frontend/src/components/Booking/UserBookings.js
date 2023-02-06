import React from "react";
import './Booking.css'

const UserBookings = () => {
    return (
        <>
            <div id="header"><h2>Trips</h2></div>
            <div className="bookings-container">
                <div className="user-bookings">
                    <div className="future-bookings"></div>
                    <div className="past-bookings"></div>
                </div>
                <div className="owner-bookings"></div>
            </div>
        </>
    )
}

export default UserBookings
