import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { thunkAddReview, thunkGetReviews } from '../../store/spotReviews'
// import './CreateSpot.css'

function AddReview() {
    const { spotId } = useParams()

    const [review, setReview] = useState('')
    const [stars, setStars] = useState('')
    const [errors, setErrors] = useState([])



    const dispatch = useDispatch()
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault();

        const newReview = {
            review: review,
            stars: stars
        }

        dispatch(thunkAddReview(newReview, spotId))
            .then(() => dispatch(thunkGetReviews(spotId)))
            .then(() => history.push(`/spots/${spotId}`))
            .catch(async (response) => {
                const data = await response.json()
                if (data && data.errors) setErrors(data.errors)

            })
    };

    return (

        <form onSubmit={handleSubmit}>
            <input
                type='number'
                value={stars}
                onChange={e => setStars(e.target.value)}
                required
                placeholder='Stars'
            />
            <textarea
                type='text'
                value={review}
                onChange={e => setReview(e.target.value)}
                required
                placeholder='Enter Review'
            />
            <button type='submit'>Add Review</button>
            <ul>
                {errors.map(error => <li key={error}>{error}</li>)}
            </ul>
        </form>

    )
}

export default AddReview