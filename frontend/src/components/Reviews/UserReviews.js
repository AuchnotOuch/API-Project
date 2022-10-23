import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getAllSpots } from '../../store/allSpots'
import { thunkGetUserReviews } from '../../store/userReviews'
import './Reviews.css'



function UserReviews() {
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getAllSpots())
            .then(() => dispatch(thunkGetUserReviews()))
    }, [dispatch])

    const reviews = useSelector(state => state.userReviews)

    const spots = useSelector(state => state.allSpots)

    if (!spots) return null
    if (!reviews) return null

    const findSpotName = (spotId) => {
        return spots[spotId].name
    }


    function reviewImgUrl(review) {
        let url;
        review.ReviewImages.forEach(image => {
            url = image.url
        })
        return url
    }

    return (
        <>
            <div id='header'><h2>Your Reviews</h2></div>
            <div className='user-reviews-container'>
                <ul className='reviews-container'>
                    {reviews && Object.values(reviews).map(review => (
                        <li className='user-reviews' key={review.id}>
                            <ul className='review-content'>
                                <NavLink id='edit-review-button' to={`/reviews/${review.id}`}><i className="fa-solid fa-pen-to-square"></i> Edit Review</NavLink>
                                <li id='spot-name'>{findSpotName(review.spotId)}</li>
                                <li id='stars'><i className="fa-solid fa-star"></i>{review.stars}</li>
                                <li id='review'>"{review.review}"</li>
                                {reviewImgUrl(review) && <img src={reviewImgUrl(review)} alt='spot review'></img>
                                }
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default UserReviews
