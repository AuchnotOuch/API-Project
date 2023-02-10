import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { csrfFetch } from "../../store/csrf"
import SelectDays from "./SelectDays";

import './Booking.css'
import { useHistory } from "react-router-dom";



const Booking = ({ spot }) => {
    const user = useSelector(state => state.session.user)
    const history = useHistory()

    const [checkin, setCheckin] = useState(new Date().toLocaleDateString())
    const [checkout, setCheckout] = useState(new Date().toLocaleDateString())
    const [dayTotal, setDayTotal] = useState(null)
    const [mountCalendar, setMountCalendar] = useState(false)
    const [errors, setErrors] = useState([])


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

    const handleSubmit = async () => {

        const errorsArr = []

        const response = await csrfFetch(`/api/spots/${spot.id}/bookings`, {
            method: 'POST',
            body: JSON.stringify({
                spotId: spot.id,
                userId: user.id,
                startDate: checkin,
                endDate: checkout
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
            }
        }
    }

    if (!user) return (
        <>
            <div className='book-spot'>
                {mountCalendar &&
                    <SelectDays dayTotal={dayTotal} checkin={checkin} setCheckin={setCheckin} checkout={checkout} setCheckout={setCheckout} mountCalendar={mountCalendar} setMountCalendar={setMountCalendar} />
                }
                <div className='book-header'>
                    <div>
                        ${spot.price} nightly
                    </div>
                    <div>
                        <div><i className="fa-solid fa-star"></i> {Math.round(spot.avgStarRating * 100) / 100 || 'No Ratings'}</div>
                    </div>
                </div>
                <button onClick={() => mount()} id="date-select-button">
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
                <button disabled={true} className="reserve">Login or Signup to Reserve!</button>
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
                <ul>
                    {errors.map(error => <li id='error' key={error}>{error}</li>)}
                </ul>
            </div>
        </>
    )
    return (
        <>
            <div className='book-spot'>
                {mountCalendar &&
                    <SelectDays dayTotal={dayTotal} checkin={checkin} setCheckin={setCheckin} checkout={checkout} setCheckout={setCheckout} mountCalendar={mountCalendar} setMountCalendar={setMountCalendar} />
                }
                <div className='book-header'>
                    <div>
                        ${spot.price} nightly
                    </div>
                    <div>
                        <div><i className="fa-solid fa-star"></i> {Math.round(spot.avgStarRating * 100) / 100 || 'No Ratings'}</div>
                    </div>
                </div>
                <button disabled={user.id === spot.ownerId} onClick={() => mount()} id="date-select-button">
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
                <button disabled={user.id === spot.ownerId || checkin === checkout} onClick={handleSubmit} className="reserve">{user.id === spot.ownerId ? "You can't book your own spot" : 'Reserve'}</button>
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
                <ul>
                    {errors.map(error => <li id='error' key={error}>{error}</li>)}
                </ul>
            </div>
        </>
    )

}

export default Booking
