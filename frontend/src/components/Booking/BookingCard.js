import React from "react";
import { Link } from "react-router-dom";
import parseISO from "date-fns/parseISO";
import './Booking.css'

const BookingCard = ({ booking }) => {

    return (
        <>
            <div className="booking-container">
                <img id='booking-image' src={booking.Spot.previewImage}></img>
                <div className="booking-info-container">
                    <p style={{ fontWeight: 'bolder' }}>{booking.Spot.city}</p>
                    {booking.Spot.Owner
                        ? <p style={{ color: 'grey' }}>Hosted by {booking.Spot.Owner.firstName}</p>
                        : <p style={{ color: 'grey' }}>Booked by {booking.User.firstName}</p>
                    }
                    <p style={{ color: 'grey' }}>{parseISO(booking.startDate).toLocaleDateString()} - {parseISO(booking.endDate).toLocaleDateString()}</p>
                </div>
                {booking.Spot.Owner && (new Date(booking.endDate) > new Date()) &&
                    <Link to={{ pathname: `/bookings/${booking.id}`, state: { booking: booking } }}><i className="fa-solid fa-pen-to-square"></i></Link>
                }
            </div>
        </>
    )
}


export default BookingCard
