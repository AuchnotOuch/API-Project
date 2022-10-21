import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { thunkDeleteReview, thunkEditReview, thunkGetUserReviews } from '../../store/userReviews'
import './Reviews.css'

function EditReview() {

    const { reviewId } = useParams()

    const targetReview = useSelector(state => state.userReviews[reviewId])
    // const userReviews = useSelector(state => state.userReviews)
    // const reviewArr = Object.keys(userReviews)
    // const targetArr = reviewArr.filter(id => id === reviewId)
    // const targetReview = userReviews[targetArr[0]]
    const [editReview, setEditReview] = useState(targetReview ? targetReview.review : '')
    const [stars, setStars] = useState(targetReview ? targetReview.stars : '')
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch()
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault();

        const editedReview = {
            review: editReview,
            stars: stars
        }

        dispatch(thunkEditReview(editedReview, reviewId))
            .then(() => setEditReview(''))
            .then(() => setStars(''))
            .then(() => dispatch(thunkGetUserReviews()))
            .then(() => history.push(`/reviews/current`))
            .catch(async (response) => {
                const data = await response.json()
                if (data && data.errors) setErrors(data.errors)
            })
    };



    const deleteReview = () => {
        dispatch(thunkDeleteReview(reviewId))
            .then(() => dispatch(thunkGetUserReviews()))
            .then(() => history.push(`/reviews/current`))
    }

    // useEffect(() => {

    // }, [deleteReview])


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
            <ul>
                {errors.map(error => <li key={error}>{error}</li>)}
            </ul>
        </div>

    )
}

export default EditReview
