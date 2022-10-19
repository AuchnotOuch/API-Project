import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { thunkGetReviews } from '../../store/spotReviews'
import './Reviews.css'

function Reviews() {

    const [allowReview, setAllowReview] = useState(true)
    const { spotId } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(thunkGetReviews(spotId))
    }, [spotId, dispatch])

    const reviews = useSelector(state => state.spotReviews)
    const spot = useSelector(state => state.singleSpot)
    const user = useSelector(state => state.session.user)

    const existingReviewCheck = () => {
        if (Object.values(reviews).find(review => review.userId === user.id)) {
            setAllowReview(false)
        }
    }

    useEffect(() => {
        existingReviewCheck()
    })

    if (!spot) return null
    if (!Object.entries(reviews).length) return null
    if (!user || !allowReview) return (
        <div className='reviews'>
            <h2>Reviews</h2>
            <ul>
                {Object.values(reviews).map(review => (
                    <li key={review.id}>
                        <ul className='review-content'>
                            <li>{review.User.firstName}</li>
                            <li>{review.stars} Stars</li>
                            <li>{review.review}</li>
                            {reviewImgUrl(review) && <img src={reviewImgUrl(review)} alt='spot review'></img>
                            }
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    )
    const owner = (spot.ownerId === user.id)
    function reviewImgUrl(review) {
        let url;
        review.ReviewImages.forEach(image => {
            url = image.url
        })
        return url
    }

    return (
        <div className='reviews'>
            <h2>Reviews</h2>
            {!owner && (<NavLink exact to={`/spots/${spotId}/reviews`}>Add Review</NavLink>)}
            <ul>
                {Object.values(reviews).map(review => (
                    <li key={review.id}>
                        <ul className='review-content'>
                            <li>{review.User.firstName}</li>
                            <li>{review.stars} Stars</li>
                            <li>{review.review}</li>
                            {reviewImgUrl(review) && <img src={reviewImgUrl(review)} alt='spot review'></img>
                            }
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Reviews;
