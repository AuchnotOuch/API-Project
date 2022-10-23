import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getAllSpots } from '../../store/allSpots'
import './UserSpots.css'



function UserSpots() {
    const user = useSelector(state => state.session.user)
    const allSpots = useSelector(state => state.allSpots)

    const userSpots = {}
    Object.values(allSpots).map(spot => {
        if (spot.ownerId === user.id) {
            userSpots[spot.id] = { ...spot }
        }
        return
    })

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])


    return (
        <>
            <div id='header'><h2>Your Spots</h2></div>
            <div id='user-spots-container-main'>
                <div className='user-spots'>
                    {Object.values(userSpots).map(spot => (
                        <div key={spot.id} className='user-spot-card'>
                            <Link to={`/spots/${spot.id}`}>
                                <div key={spot.id} className='user-spot-container'>
                                    <div className='wrapper'>
                                        <img src={spot.previewImage} alt={spot.name}></img>
                                    </div>
                                    <div>
                                        <div id='location-stars'>
                                            <span>{spot.city}, {spot.state}</span>
                                            <span><i className="fa-solid fa-star"></i> {spot.avgRating || 'No Rating'}</span>
                                        </div>
                                        <br></br>
                                        <div id='price-nightly'>
                                            <div id='price'>${spot.price}</div><div>nightly</div>
                                        </div>
                                    </div>
                                </div>
                            </Link>

                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default UserSpots;
