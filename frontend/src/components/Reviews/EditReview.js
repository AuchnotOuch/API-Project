import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { thunkDeleteReview, thunkEditReview } from '../../store/userReviews'
import './Reviews.css'

function EditReview() {

    const { reviewId } = useParams()

    const targetReview = useSelector(state => state.userReviews[reviewId])

    const [editReview, setEditReview] = useState(targetReview.review)
    const [stars, setStars] = useState(targetReview.stars)
    const dispatch = useDispatch()
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault();

        const editedReview = {
            review: editReview,
            stars: stars
        }

        dispatch(thunkEditReview(editedReview, reviewId))
        console.log('targetReview--->', targetReview)
        history.push(`/reviews/current`)
    };

    const deleteReview = () => {
        dispatch(thunkDeleteReview(reviewId))
        history.push(`/reviews/current`)
    }

    return (
        <div className='edit-review-container'>
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
                    value={editReview}
                    onChange={e => setEditReview(e.target.value)}
                    required
                    placeholder='Enter Review'
                />
                <button type='submit'>Save</button>
            </form>
            <button onClick={deleteReview}>Delete</button>
        </div>

    )
}

export default EditReview
