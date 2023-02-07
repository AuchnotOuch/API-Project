import React, { useEffect, useState } from "react";
import { csrfFetch } from "../../store/csrf";
import './Booking.css'
import BookingCard from "./BookingCard";

const UserBookings = () => {
    const [currentUserBookings, setCurrentUserBookings] = useState([])
    const [pastUserBookings, setPastUserBookings] = useState([])

    const [ownerSpots, setOwnerSpots] = useState([])
    const [currentOwnerBookings, setCurrentOwnerBookings] = useState([])
    const [pastOwnerBookings, setPastOwnerBookings] = useState([])


    useEffect(() => {
        const currentBookings = []
        const pastBookings = []
        const getBookings = async () => {
            const response = await csrfFetch('/api/bookings/current', {
                method: 'GET'
            })
            if (response.ok) {
                const data = await response.json()
                data.Bookings.forEach(booking => {
                    if (new Date(booking.endDate) < new Date()) {
                        pastBookings.push(booking)
                    }
                    if (new Date(booking.endDate) > new Date()) {
                        currentBookings.push(booking)
                    }
                })
                setCurrentUserBookings(currentBookings)
                setPastUserBookings(pastBookings)
            }
        }
        console.log('currentUser', currentUserBookings)
        console.log('pastUser', pastUserBookings)


        const getOwnerSpots = async () => {
            const response = await csrfFetch('/api/spots/current', {
                method: 'GET'
            })
            if (response.ok) {
                const data = await response.json()
                console.log(data.Spots)
                setOwnerSpots(data.Spots)
            }
        }
        console.log("currentOwner", currentOwnerBookings)
        console.log("pastOwner", pastOwnerBookings)
        getBookings()
        getOwnerSpots()
    }, [])

    useEffect(() => {
        const currentOwner = []
        const pastOwner = []
        ownerSpots.forEach(spot => {
            spot.Bookings.forEach(booking => {
                console.log(booking)
                booking.Spot.previewImage = spot.previewImage
                if (new Date(booking.endDate) < new Date()) {
                    pastOwner.push(booking)
                }
                if (new Date(booking.endDate) > new Date()) {
                    currentOwner.push(booking)
                }
            })
        })
        setCurrentOwnerBookings(currentOwner)
        setPastOwnerBookings(pastOwner)
    }, [ownerSpots])

    if (!currentUserBookings || !currentOwnerBookings || !pastOwnerBookings || !pastUserBookings) return null
    return (
        <>
            <div id="header"><h2>Trips</h2></div>
            <div className="bookings-container">
                <div className="user-bookings">
                    <h2>Your Trips</h2>
                    <h3>Where you're going</h3>
                    <div className="future-bookings">
                        {currentUserBookings &&
                            currentUserBookings.map(booking => (
                                <BookingCard key={booking.id} booking={booking} />
                            ))}
                    </div>
                    <h3>Where you've been</h3>
                    <div className="past-bookings">
                        {pastUserBookings &&
                            pastUserBookings.map(booking => (
                                <BookingCard key={booking.id} booking={booking} />
                            ))}
                    </div>
                </div>
                <div className="owner-bookings">
                    <h2>Trips Booked For Your Spots</h2>
                    <h3>Current</h3>
                    <div className="future-bookings">
                        {currentOwnerBookings &&
                            currentOwnerBookings.map(booking => (
                                <BookingCard key={booking.id} booking={booking} />
                            ))}
                    </div>
                    <h3>Past</h3>
                    <div className="past-bookings">
                        {currentOwnerBookings &&
                            pastOwnerBookings.map(booking => (
                                <BookingCard key={booking.id} booking={booking} />
                            ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserBookings
