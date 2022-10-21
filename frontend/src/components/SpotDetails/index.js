import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { thunkGetSpot } from '../../store/singleSpot'
import Reviews from '../../components/Reviews'
import './SpotDetails.css'
import EditSpot from '../EditSpot'

function SpotDetails() {
    const [editMode, setEditMode] = useState(false)
    const { spotId } = useParams()
    const history = useHistory()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(thunkGetSpot(spotId))
            .then(() => history.push(`/spots/${spotId}`))
    }, [history, spotId, dispatch])

    const mountEditSpot = () => {
        setEditMode(true)
    }

    const spot = useSelector(state => state.singleSpot)
    const user = useSelector(state => state.session.user)
    const reviews = useSelector(state => state.spotReviews)
    const spotRating = useSelector(state => state.allSpots[spotId].avgRating)

    if (!spot.SpotImages) return null
    let spotImgUrl;
    spot.SpotImages.forEach(img => spotImgUrl = img.url)

    if (!user) return (
        <div className='single-spot'>
            <div className='spot-details'>
                <div><h2>{spot.name}</h2></div>
                <div id='rating'><i className="fa-solid fa-star"></i> {spotRating} -{spot.city}, {spot.state}, {spot.country}</div>
                <br></br>
                <div className='spot'>
                    <img src={spotImgUrl} alt={spot.name}></img>
                    <div>{spot.name}</div>
                    <div>{spot.description}</div>
                    <div>${spot.price}</div>
                </div>
                <Reviews />
            </div>
        </div>
    )

    const owner = (spot.ownerId === user.id)

    let elements;
    if (!editMode) {
        elements = (
            <div className='single-spot'>
                <div className='spot-details'>
                    <div><h2>{spot.name}</h2></div>
                    <div id='rating'><i className="fa-solid fa-star"></i> {spotRating} - {spot.city}, {spot.state}, {spot.country}</div>
                    <br></br>
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
