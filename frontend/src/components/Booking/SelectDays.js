import React, { useEffect, useState } from "react";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import './Booking.css'

const SelectDays = ({ checkin, setCheckin, setCheckout, checkout, setMountCalendar, mountCalendar }) => {
    const [value, onChange] = useState(new Date());
    const [dayTotal, setDayTotal] = useState(null)

    useEffect(() => {
        if (value.length === 2) {
            const days = () => {
                let start = value[0]
                let end = value[1]
                console.log(value)
                let totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24) - 1)
                setDayTotal(totalDays)
            }
            days()
        }
    }, [value])

    const unmountCalendar = () => {
        setCheckin(value[0].toLocaleDateString())
        setCheckout(value[1].toLocaleDateString())
        setMountCalendar(!mountCalendar)
    }

    console.log(value)
    console.log(dayTotal)

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
            <Calendar className='calendar' onChange={onChange} value={value} selectRange={true} />
            <button className="save-dates">Save</button>
        </div>
    )
}

export default SelectDays
