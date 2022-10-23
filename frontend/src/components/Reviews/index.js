import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { actionClearReviews, thunkGetReviews } from '../../store/spotReviews'
import './Reviews.css'

function Reviews() {

    const [allowReview, setAllowReview] = useState(true)
    const { spotId } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actionClearReviews())
        dispatch(thunkGetReviews(spotId))
    }, [spotId, dispatch])

    const reviews = useSelector(state => state.spotReviews)
    const spot = useSelector(state => state.singleSpot)
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        if (user && Object.values(reviews).find(review => review.userId === user.id)) {
            setAllowReview(false)
        }

    }, [reviews, user])


    if (!spot) return null
    // if (!reviews) return (
    //     <div>No reviews for this spot!</div>
    // )
    if (!user) return (
        <div className='reviews'>
            <div id='reviews-label'>Reviews</div>
            <br></br>
            <ul>
                {reviews && Object.values(reviews).map(review => (
                    <li key={review.id}>
                        <div className='review-content'>
                            <div id='name-stars'>
                                <div>{review.User.firstName}</div>
                                <div><i className="fa-solid fa-star"></i>{review.stars}</div>
                            </div>
                            <div id='review'>"{review.review}"</div>
                            <br></br>
                            {reviewImgUrl(review) && <img src={reviewImgUrl(review)} alt='spot review'></img>
                            }
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )

    if (!allowReview) return (
        <div className='reviews'>
            <div id='reviews-label'>Reviews</div>
            <br></br>
            <ul>
                {Object.values(reviews).map(review => (
                    <li key={review.id}>
                        <div className='review-content'>
                            <div id='name-stars'>
                                <div>{review.User.firstName}</div>
                                <div><i className="fa-solid fa-star"></i>{review.stars}</div>
                            </div>
                            <div id='review'>"{review.review}"</div>
                            <br></br>
                            {reviewImgUrl(review) && <img src={reviewImgUrl(review)} alt='spot review'></img>
                            }
                        </div>
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
            <div id='reviews-label'>Reviews</div>
            <br></br>
            {!owner && (<NavLink exact to={`/spots/${spotId}/reviews`}><i className="fa-regular fa-square-plus"></i> Add Review</NavLink>)}
            <ul>
                {Object.values(reviews).map(review => (
                    <li key={review.id}>
                        <div className='review-content'>
                            <div id='name-stars'>
                                <div>{review.User.firstName}</div>
                                <div><i className="fa-solid fa-star"></i>{review.stars}</div>
                            </div>
                            <div id='review'>"{review.review}"</div>
                            <br></br>
                            {reviewImgUrl(review) && <img src={reviewImgUrl(review)} alt='spot review'></img>
                            }
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Reviews;
