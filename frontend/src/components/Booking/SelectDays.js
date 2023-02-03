import React, { useEffect, useState } from "react";
import { csrfFetch } from "../../store/csrf";
import { useParams } from "react-router-dom";
import { isWithinInterval, parseISO } from 'date-fns'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import './Booking.css'

const SelectDays = ({ setCheckin, setCheckout, setMountCalendar, mountCalendar }) => {
    const { spotId } = useParams()
    const [value, onChange] = useState(new Date());
    const [dayTotal, setDayTotal] = useState(null)
    const [currentBookings, setCurrentBookings] = useState([])

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
        const getBookings = async () => {
            const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
                method: 'GET'
            })
            if (response.ok) {
                const data = await response.json()
                setCurrentBookings(data.Bookings)
                console.log(currentBookings)
            }
        }
        getBookings()
    }, [spotId])

    const unmountCalendar = () => {
        setCheckin(value[0].toLocaleDateString())
        setCheckout(value[1].toLocaleDateString())
        setMountCalendar(!mountCalendar)
    }

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

    return (
        <div className="select-dates">
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
                    <div className="check-in">
                        <div className="check-in-header">CHECK-IN</div>
                        {value.length === 2 &&
                            <div className="date">{value[0].toLocaleDateString()}</div>
                        }
                    </div>
                    <div className="check-out">
                        <div className="check-out-header">CHECK-OUT</div>
                        {value.length === 2 &&
                            <div className="date">{value[1].toLocaleDateString()}</div>
                        }
                    </div>
                </div>
            </div>
            <Calendar className='calendar' onChange={onChange} value={value} selectRange={true} tileDisabled={tileDisabled} />
            <span><button onClick={unmountCalendar} className="save-dates">Save</button></span>
            <span><button onClick={() => setMountCalendar(!mountCalendar)} className="cancel-dates">Cancel</button></span>

        </div>
    )
}

export default SelectDays
