import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { thunkGetSpot } from '../../store/singleSpot'
import Reviews from '../../components/Reviews'
import './SpotDetails.css'
import EditSpot from '../EditSpot'
import { getAllSpots } from '../../store/allSpots'


function SpotDetails() {
    const [editMode, setEditMode] = useState(false)
    const { spotId } = useParams()
    const history = useHistory()

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getAllSpots())
            .then(() => dispatch(thunkGetSpot(spotId)))
            .then(() => history.push(`/spots/${spotId}`))
    }, [history, spotId, dispatch])


    const mountEditSpot = () => {
        setEditMode(true)
    }

    const spot = useSelector(state => state.singleSpot)
    console.log(spot)
    const user = useSelector(state => state.session.user)
    // const spots = useSelector(state => state.allSpots)

    if (!spot) return null
    if (!spot.SpotImages) return null
    let spotImgUrl;
    spot.SpotImages.forEach(img => spotImgUrl = img.url)

    if (!user) return (
        <div className='single-spot'>
            <div className='spot-details'>
                <div id='price-div'>${spot.price} nightly</div>

                <div><h2>{spot.name}</h2></div>
                <div id='rating'><i className="fa-solid fa-star"></i>{spot.city}, {spot.state}, {spot.country}</div>
                <br></br>
                <div className='spot'>
                    <img src={spotImgUrl} alt={spot.name}></img>
                    <br></br>
                    <br></br>
                    <div id='host-div'>Hosted by {spot.Owner.firstName}</div>
                    <br></br>
                    <div id='description'>
                        <div>{spot.description}</div>
                    </div>
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
                    <div id='book-spot'>
                        <div id='book-header'>
                            <div>
                                ${spot.price} nightly
                            </div>
                            <div>
                                <div><i className="fa-solid fa-star"></i> {Math.round(spot.avgStarRating * 100) / 100 || 'No Ratings'}</div>
                            </div>

                        </div>

                    </div>
                    {owner &&
                        <button id='edit-button' onClick={mountEditSpot}><i className="fa-solid fa-pen-to-square"></i> Edit Spot</button>
                    }
                    <div><h2>{spot.name}</h2></div>
                    <div>{spot.city}, {spot.state}, {spot.country}</div>
                    <br></br>
                    <div className='spot'>
                        <img src={spotImgUrl} alt={spot.name}></img>
                        <br></br>
                        <br></br>
                        <div id='host-div'>Hosted by {spot.Owner.firstName}</div>
                        <br></br>
                        <div id='description'>
                            <div>{spot.description}</div>
                        </div>
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
