import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { thunkGetReviews } from '../../store/spotReviews'

function Reviews() {
    const { spotId } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(thunkGetReviews(spotId))
    }, [spotId, dispatch])


    const reviews = useSelector(state => state.spotReviews)

    if (!reviews) return null

    function reviewImgUrl(review) {
        let url;
        review.ReviewImages.forEach(image => {
            url = image.url
        })
        return url
    }

    return (<div className='reviews'>
        <h2>Reviews</h2>
        <ul>
            {Object.values(reviews).map(review => (
                <li key={review.id}>
                    <ul className='review-content'>
                        <li>{review.User.firstName}</li>
                        <li>{review.stars} Stars</li>
                        <li>{review.review}</li>
                        <img src={reviewImgUrl(review)}></img>
                    </ul>
                </li>
            ))}
        </ul>
    </div>
    )
}

export default Reviews;
