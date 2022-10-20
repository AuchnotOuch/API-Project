import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { thunkGetUserReviews } from '../../store/userReviews'
import './Reviews.css'



function UserReviews() {
    const dispatch = useDispatch()



    const reviews = useSelector(state => state.userReviews)

    useEffect(() => {
        dispatch(thunkGetUserReviews())
    }, [dispatch])

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
            <ul className='reviews-container'>
                {Object.values(reviews).map(review => (
                    <li className='user-reviews' key={review.id}>
                        <ul className='review-content'>
                            <li>{review.stars}<i className="fa-solid fa-star"></i></li>
                            <li>{review.review}</li>
                            {reviewImgUrl(review) && <img src={reviewImgUrl(review)} alt='spot review'></img>
                            }
                        </ul>
                        <NavLink to={`/reviews/${review.id}`}>Edit Review</NavLink>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default UserReviews
