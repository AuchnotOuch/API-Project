import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { thunkGetSpot } from '../../store/singleSpot'
import { thunkGetReviews } from '../../store/spotReviews'
import Reviews from '../../components/Reviews'
import './SpotDetails.css'

function SpotDetails() {
    const { spotId } = useParams()
    console.log(spotId)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(thunkGetSpot(spotId))
        dispatch(thunkGetReviews(spotId))
    }, [spotId, dispatch])

    const spot = useSelector(state => state.singleSpot)
    const reviews = useSelector(state => state.spotReviews)
    console.log(reviews)
    if (!reviews) return null
    if (!spot.SpotImages) return null

    let spotImgUrl;
    spot.SpotImages.forEach(img => spotImgUrl = img.url)

    function reviewImgUrl(review) {
        let url;
        review.ReviewImages.forEach(image => {
            url = image.url
        })
        return url
    }

    return (
        <div className='spot-details'>
            <div className='spot'>
                <img src={spotImgUrl} alt={spot.name}></img>
                <div>{spot.name}</div>
                <div>{spot.description}</div>
                <div>${spot.price}</div>
            </div>
            <Reviews />
        </div>
    )

}

export default SpotDetails;
