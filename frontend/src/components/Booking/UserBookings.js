import React from "react";
import './Booking.css'

const UserBookings = () => {
    return (
        <>
            <div id="header"><h2>Trips</h2></div>
            <div className="bookings-container">
                <div className="user-bookings">
                    <h2>Your Trips</h2>
                    <div className="future-bookings">
                        <h3>Current</h3>
                    </div>
                    <div className="past-bookings">
                        <h3>Past</h3>
                    </div>
                </div>
                <div className="owner-bookings">
                    <h2>Trips Booked For Your Spots</h2>
                    <div className="future-bookings">
                        <h3>Current</h3>
                    </div>
                    <div className="past-bookings">
                        <h3>Past</h3>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserBookings
