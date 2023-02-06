import React, { useEffect, useState } from "react";
import { csrfFetch } from "../../store/csrf";
import './Booking.css'

const UserBookings = () => {
    const [userBookings, setUserBookings] = useState([])
    const [ownerBookings, setOwnerBookings] = useState([])

    useEffect(() => {
        const getBookings = async () => {
            const response = await csrfFetch('/api/bookings/current', {
                method: 'GET'
            })
            if (response.ok) {
                const data = await response.json()
                setUserBookings(data.Bookings)
                console.log(data)
            }
        }

        const getOwnerBookings = async () => {
            const response = await csrfFetch('/api/spots/current', {
                method: 'GET'
            })
            if (response.ok) {
                const data = await response.json()
                console.log(data)
                if (data.Spots) {
                    let ownerBookingsArr = []
                    data.Spots.forEach(spot => {
                        const bookings = fetchOwnerBookings(spot.id).then(bookings => {
                            bookings.forEach(booking => ownerBookingsArr.push(booking))
                        })
                    })
                    setOwnerBookings(ownerBookingsArr)
                }
            }
        }
        getBookings()
        getOwnerBookings()
    }, [])

    const fetchOwnerBookings = async (spotId) => {
        const response = await csrfFetch(`/api/bookings/${spotId}`, {
            method: 'GET'
        })
        if (response.ok) {
            const data = await response.json()
            console.log(data)
            return data.Bookings
        }
    }

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
