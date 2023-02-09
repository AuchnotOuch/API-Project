import React, { useState, useEffect } from "react";
import { csrfFetch } from "../../store/csrf";
import Calendar from "react-calendar";
import { isWithinInterval, parseISO } from "date-fns";
import { Link, useHistory, useLocation } from "react-router-dom";
import './Booking.css'
import DeleteBooking from "./DeleteBooking";


const EditBooking = () => {
    const location = useLocation()
    const history = useHistory()
    const { booking } = location.state
    const [value, onChange] = useState([parseISO(booking.startDate), parseISO(booking.endDate)]);
    const [dayTotal, setDayTotal] = useState(null)
    const [currentBookings, setCurrentBookings] = useState([])
    const [deleteMode, setDeleteMode] = useState(false)
    const [errors, setErrors] = useState([])

    useEffect(() => {
        if (value.length === 2) {
            const days = () => {
                let start = value[0]
                let end = value[1]
                let totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24) - 1)
                setDayTotal(totalDays)
            }
            days()
        }
    }, [value])

    useEffect(() => {
        const errorArr = []

        if (value[0] < new Date() || value[1] < new Date()) {
            errorArr.push("Checkin and checkout must be a date in the future")
        }

        setErrors(errorArr)
    }, [value])

    useEffect(() => {
        const getBookings = async () => {
            const response = await csrfFetch(`/api/bookings/${booking.Spot.id}`, {
                method: 'GET'
            })
            if (response.ok) {
                const data = await response.json()
                const bookings = data.Bookings.filter(book => book.id !== booking.id)
                setCurrentBookings(bookings)
            }
        }
        getBookings()
    }, [booking])

    const tileDisabled = ({ date, view }) => {
        if (view === 'month') {
            return isWithinRanges(date, currentBookings)
        }
    }

    const isWithinRanges = (date, ranges) => {
        return ranges.some(range => isWithinRange(date, range))
    }

    const isWithinRange = (date, range) => {
        return isWithinInterval(date, { start: parseISO(range.startDate), end: parseISO(range.endDate) });
    }

    const handleSubmit = async () => {

        const errorsArr = []

        const response = await csrfFetch(`/api/bookings/${booking.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                startDate: value[0],
                endDate: value[1]
            })
        })
        if (response.ok) {
            history.push('/bookings/current')
        }
        if (response.err) {
            const data = await response.json()
            if (data && data.errors) {
                data.errors.forEach(error => {
                    errorsArr.push(error.message)
                })
                setErrors(errorsArr)
                console.log(errorsArr)
            }
        }
    }

    return (
        <div className="edit-container">
            {deleteMode &&
                <DeleteBooking booking={booking} deleteMode={deleteMode} setDeleteMode={setDeleteMode} />
            }
            <div className="spot-info">
                <img id="spot-image" src={booking.Spot.previewImage} />
                <p>Hosted by {booking.Spot.Owner.firstName}</p>
                <h3>Current Booking:</h3>
                <div className="current-booking-dates">
                    <div className="current-checkin">
                        <p style={{ fontWeight: 'bold' }}>Check-in</p>
                        <p>{parseISO(booking.startDate).toLocaleDateString()}</p>
                    </div>
                    <div className="current-date">
                        <p style={{ fontWeight: 'bold' }}>Check-out</p>
                        <p>{parseISO(booking.endDate).toLocaleDateString()}</p>
                    </div>
                </div>
            </div>
            <div className="edit-booking-container">
                {(value[0] < new Date() || value[1] < new Date())
                    ? <h2 style={{ color: 'red', fontWeight: 'bolder' }}>Future Dates Only</h2>
                    : <h2>Select new dates:</h2>
                }
                <br></br>
                <div className="select-dates-header">
                    <div className="booking-length">
                        {dayTotal} nights
                        <div className="booking-range">
                            {value.length === 2 &&
                                `${value[0].toLocaleDateString()} - ${value[1].toLocaleDateString()}`
                            }
                        </div>
                    </div>
                    <div className='date-select'>
                        <div style={value[0] < new Date() ? { backgroundColor: 'red' } : { backgroundColor: 'white' }} className="check-in">
                            <div className="check-in-header">CHECK-IN</div>
                            {value.length === 2 &&
                                <div className="date">{value[0].toLocaleDateString()}</div>
                            }
                        </div>
                        <div style={value[1] < new Date() ? { backgroundColor: 'red' } : { backgroundColor: 'white' }} className="check-out">
                            <div className="check-out-header">CHECK-OUT</div>
                            {value.length === 2 &&
                                <div className="date">{value[1].toLocaleDateString()}</div>
                            }
                        </div>
                    </div>
                </div>
                <Calendar className='calendar' onChange={onChange} value={value} selectRange={true} tileDisabled={tileDisabled} />
                <span><button onClick={handleSubmit} disabled={!!errors.length} className="save-dates">Save</button></span>
                <span><Link to='/bookings/current' className="cancel-dates">Cancel</Link></span>
                <h3>Need to cancel your trip?<button onClick={() => setDeleteMode(!deleteMode)} style={{ background: 'none', border: 'none' }}>Click here.</button></h3>
            </div>
        </div>
    )
}


export default EditBooking
