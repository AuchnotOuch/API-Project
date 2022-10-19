import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { thunkGetSpot } from '../../store/singleSpot'
import Reviews from '../../components/Reviews'
import './SpotDetails.css'
import EditSpot from '../EditSpot'

function SpotDetails() {
    const [editMode, setEditMode] = useState(false)
    const { spotId } = useParams()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(thunkGetSpot(spotId))
    }, [spotId, dispatch])

    const mountEditSpot = () => {
        setEditMode(true)
    }

    const spot = useSelector(state => state.singleSpot)
    const user = useSelector(state => state.session.user)

    if (!spot.SpotImages) return null
    let spotImgUrl;
    spot.SpotImages.forEach(img => spotImgUrl = img.url)

    if (!user) return (
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

    const owner = (spot.ownerId === user.id)

    let elements;
    if (!editMode) {
        elements = (
            <div className='spot-details'>
                <div className='spot'>
                    {owner &&
                        <button onClick={mountEditSpot}>Edit Your Spot</button>
                    }
                    <img src={spotImgUrl} alt={spot.name}></img>
                    <div>{spot.name}</div>
                    <div>{spot.description}</div>
                    <div>${spot.price}</div>
                </div>
                <Reviews />
            </div>
        )
    } else {
        elements = (
            <EditSpot spot={spot} />
        )
    }



    return (
        <>
            {elements}
        </>
    )

}

export default SpotDetails;
