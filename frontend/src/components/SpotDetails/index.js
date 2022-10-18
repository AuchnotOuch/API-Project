import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { thunkGetSpot } from '../../store/singleSpot'
import Reviews from '../../components/Reviews'
import './SpotDetails.css'

function SpotDetails() {
    const { spotId } = useParams()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(thunkGetSpot(spotId))
    }, [spotId, dispatch])

    const spot = useSelector(state => state.singleSpot)

    if (!spot.SpotImages) return null

    let spotImgUrl;
    spot.SpotImages.forEach(img => spotImgUrl = img.url)



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
