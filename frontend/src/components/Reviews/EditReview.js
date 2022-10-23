import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { thunkDeleteReview, thunkEditReview, thunkGetUserReviews } from '../../store/userReviews'
import '../CreateSpot/CreateSpot.css'

function EditReview() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { reviewId } = useParams()

    // useEffect(() => {
    //     dispatch(thunkGetUserReviews())
    // }, [dispatch])

    const targetReview = useSelector(state => state.userReviews[reviewId])
    const [editReview, setEditReview] = useState(targetReview ? targetReview.review : '')
    const [stars, setStars] = useState(targetReview ? targetReview.stars : '')
    console.log(stars)
    const [errors, setErrors] = useState([])


    useEffect(() => {
        const errArr = []
        if (stars === '') {
            errArr.push("Please provide a rating")
        }
        if (editReview.length === 0) {
            errArr.push("Please provide a review")
        }
        if (editReview.length > 256) {
            errArr.push('Review must be less than 256 characters')
        }
        setErrors(errArr)
    }, [stars, editReview])

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
                        defaultChecked={stars === 1}

                    />
                    <label>1</label>
                    <input
                        name='rating'

                        type='radio'
                        value={2}
                        onChange={e => setStars(e.target.value)}
                        placeholder='Stars'
                        defaultChecked={stars === 2}
                    />
                    <label>2</label>
                    <input
                        name='rating'

                        type='radio'
                        value={3}
                        onChange={e => setStars(e.target.value)}
                        placeholder='Stars'
                        defaultChecked={stars === 3}
                    />
                    <label>3</label>
                    <input
                        name='rating'

                        type='radio'
                        value={4}
                        onChange={e => setStars(e.target.value)}
                        placeholder='Stars'
                        defaultChecked={stars === 4}
                    />
                    <label>4</label>
                    <input
                        name='rating'

                        type='radio'
                        value={5}
                        onChange={e => setStars(e.target.value)}
                        placeholder='Stars'
                        defaultChecked={stars === 5}
                    />
                    <label>5</label>
                </div>
                <textarea
                    type='text'
                    value={editReview}
                    onChange={e => setEditReview(e.target.value)}
                    required
                    placeholder='Enter Review'

                />
                <ul>
                    {errors.map(error => <li id='error' key={error}>{error}</li>)}
                </ul>
                <button id='create-spot-button' type='submit' disabled={!!errors.length}>Save</button>
                <button id="delete-button-review" onClick={deleteReview}><i className="fa-solid fa-trash-can"></i>Delete</button>
            </form>
        </div>

    )
}

export default EditReview
