import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { thunkGetSpot } from '../../store/singleSpot'

function SpotDetails() {
    const { spotId } = useParams()
    console.log(spotId)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(thunkGetSpot(spotId))
    }, [spotId, dispatch])

    const spot = useSelector(state => state.singleSpot)
    if (!spot.SpotImages) return null
    console.log(spot.SpotImages)

    let spotImgUrl;

    spot.SpotImages.forEach(img => spotImgUrl = img.url)

    // console.log(spotImgUrl)

    return (
        <div>
            <img src={spotImgUrl} alt={spot.name}></img>
            <div>{spot.name}</div>
            <div>{spot.description}</div>
            <div>${spot.price}</div>
        </div>
    )

}

export default SpotDetails;
