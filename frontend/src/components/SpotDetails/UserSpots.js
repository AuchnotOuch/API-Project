import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { thunkGetUserSpots, actionClearAllSpots } from '../../store/allSpots'
import '../HomePage/HomePage.css'



function UserSpots() {
    const allSpots = useSelector(state => state.allSpots)
    console.log(allSpots)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actionClearAllSpots())
        dispatch(thunkGetUserSpots())
    }, [dispatch])


    return (
        <>
            <div className='spots'>
                {Object.values(allSpots).map(spot => (
                    <div key={spot.id} className='spot-card'>
                        <Link to={`/spots/${spot.id}`}>
                            <div key={spot.id} className='container'>

                                <img src={spot.previewImage} alt={spot.name}></img>

                                <div>
                                    <div>{spot.city}, {spot.state}</div>
                                    <div>{spot.avgRating ? spot.avgRating : 'No Ratings'}<i className="fa-solid fa-star"></i></div>
                                    <div>${spot.price}</div>
                                </div>
                                <div>
                                </div>
                            </div>
                        </Link>

                    </div>
                ))}
            </div>
        </>
    )
}

export default UserSpots;
