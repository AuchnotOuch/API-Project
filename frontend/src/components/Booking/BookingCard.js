import React from "react";
import parseISO from "date-fns/parseISO";
import './Booking.css'

const BookingCard = ({ booking }) => {

    return (
        <>
            <div className="booking-container">
                <img id='booking-image' src={booking.Spot.previewImage}></img>
                <div className="booking-info-container">
                    <p>{booking.Spot.city}</p>
                    {booking.Spot.Owner
                        ? <p>Hosted by {booking.Spot.Owner.firstName}</p>
                        : <p>Booked by {booking.User.firstName}</p>
                    }
                    <p>{parseISO(booking.startDate).toLocaleDateString()} - {parseISO(booking.endDate).toLocaleDateString()}</p>
                </div>
            </div>
        </>
    )
}


export default BookingCard
