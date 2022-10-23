import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { thunkAddReview, thunkGetReviews } from '../../store/spotReviews'
import '../CreateSpot/CreateSpot.css'

function AddReview() {
    const { spotId } = useParams()

    const [review, setReview] = useState('')
    const [stars, setStars] = useState('')
    const [errors, setErrors] = useState([])



    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        const errArr = []
        if (stars === '') {
            errArr.push("Please provide a rating")
        }
        if (review.length === 0) {
            errArr.push("Please provide a review")
        }
        if (review.length > 256) {
            errArr.push('Review must be less than 256 characters')
        }
        setErrors(errArr)
    }, [stars, review])


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
        <div className='form-div'>
            <form onSubmit={handleSubmit}>
                <div className='rating'>
                    <div>Stars:</div>
                    <input
                        name='rating'
                        type='radio'
                        value={1}
                        onChange={e => setStars(e.target.value)}
                        placeholder='Stars'

                    />
                    <label>1</label>
                    <input
                        name='rating'

                        type='radio'
                        value={2}
                        onChange={e => setStars(e.target.value)}
                        placeholder='Stars'
                    />
                    <label>2</label>
                    <input
                        name='rating'

                        type='radio'
                        value={3}
                        onChange={e => setStars(e.target.value)}
                        placeholder='Stars'
                    />
                    <label>3</label>
                    <input
                        name='rating'

                        type='radio'
                        value={4}
                        onChange={e => setStars(e.target.value)}
                        placeholder='Stars'
                    />
                    <label>4</label>
                    <input
                        name='rating'

                        type='radio'
                        value={5}
                        onChange={e => setStars(e.target.value)}
                        placeholder='Stars'
                    />
                    <label>5</label>
                </div>
                <textarea
                    type='text'
                    value={review}
                    onChange={e => setReview(e.target.value)}
                    required
                    placeholder='Enter Review'
                />
                <button id='create-spot-button' type='submit' disabled={!!errors.length}>Add Review</button>
                <ul>
                    {errors.map(error => <li id='error' key={error}>{error}</li>)}
                </ul>
            </form>
        </div>

    )
}

export default AddReview
