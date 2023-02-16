import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { thunkGetSpot } from '../../store/singleSpot'
import Reviews from '../../components/Reviews'
import './SpotDetails.css'
import EditSpot from '../EditSpot'
import { getAllSpots } from '../../store/allSpots'
import Booking from '../Booking'


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
    const user = useSelector(state => state.session.user)
    // const spots = useSelector(state => state.allSpots)

    if (!spot) return null
    if (!spot.SpotImages) return null
    let spotImgUrl;
    spot.SpotImages.forEach(img => spotImgUrl = img.url)

    if (!user) return (
        <div className='single-spot'>
            <div className='spot-details'>
                <Booking spot={spot} />

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
                    <div className='als-cover'>
                        <span style={{ color: 'salmon' }}>al's</span><span>cover</span>
                        <div style={{ fontSize: 'large', marginTop: '10px' }}>Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</div>
                    </div>
                    <div className='offerings'>
                        <h3>What this place offers:</h3>
                        <div className='offers'>
                            <div><i className="fa-solid fa-wifi"></i> Wifi</div>
                            <div><i className="fa-solid fa-utensils"></i> Kitchen</div>
                            <div><i className="fa-solid fa-tv"></i> TV</div>
                            <div><i className="fa-solid fa-snowflake"></i> AC/Heating</div>
                            <div><i className="fa-solid fa-paw"></i> Pets Allowed</div>
                            <div><i className="fa-solid fa-car"></i> Free Parking</div>
                            <div><i className="fa-solid fa-fire"></i> Smoke/Carbon Monoxide Detecters</div>
                        </div>
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
                    <Booking spot={spot} />
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
                        <div className='als-cover'>
                            <span style={{ color: 'salmon' }}>al's</span><span>cover</span>
                            <div style={{ fontSize: 'large', marginTop: '10px' }}>Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</div>
                        </div>
                        <div className='offerings'>
                            <h3>What this place offers:</h3>
                            <div className='offers'>
                                <div><i className="fa-solid fa-wifi"></i> Wifi</div>
                                <div><i className="fa-solid fa-utensils"></i> Kitchen</div>
                                <div><i className="fa-solid fa-tv"></i> TV</div>
                                <div><i className="fa-solid fa-snowflake"></i> AC/Heating</div>
                                <div><i className="fa-solid fa-paw"></i> Pets Allowed</div>
                                <div><i className="fa-solid fa-car"></i> Free Parking</div>
                                <div><i className="fa-solid fa-fire"></i> Smoke/Carbon Monoxide Detecters</div>
                            </div>
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
