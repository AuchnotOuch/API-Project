import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getSpot } from '../../store/singleSpot'

function SpotDetails() {
    const { spotId } = useParams()
    console.log(spotId)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSpot(spotId))
    }, [spotId, dispatch])

    const spot = useSelector(state => state.singleSpot)
    console.log(spot.SpotImages)

    let spotImgUrl;
    if (!spot) return null
    else {
        spot.SpotImages.forEach(img => spotImgUrl = img.url)
    }

    console.log(spotImgUrl)

    return (
        <div>
            <img src={spotImgUrl} alt={spot.name}></img>
            <div>{spot.name}</div>
            <div>{spot.description}</div>
        </div>
    )

}

export default SpotDetails;
