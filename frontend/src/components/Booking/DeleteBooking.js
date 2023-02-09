import React from "react";
import { useHistory } from "react-router-dom";
import { csrfFetch } from "../../store/csrf";

import './Booking.css'

const DeleteBooking = ({ booking, deleteMode, setDeleteMode }) => {
    const history = useHistory()

    const handleSubmit = async () => {
        const response = await csrfFetch(`/api/bookings/${booking.id}`, {
            method: 'DELETE'
        })
        if (response.ok) {
            history.push('/bookings/current')
        }
    }

    return (
        <div className="delete-container">
            <h2 style={{ color: 'red' }}>This is a permanent action. Are you sure you want
                to cancel this trip?
            </h2>
            <div style={{ marginTop: '50px' }}>
                <button onClick={() => handleSubmit()} style={{ width: '50px', fontSize: 'large', background: 'none', marginRight: '20px' }}>Yes</button>
                <button onClick={() => setDeleteMode(!deleteMode)} style={{ width: '50px', fontSize: 'large', background: 'none' }}>No</button>
            </div>
        </div>
    )
}

export default DeleteBooking
