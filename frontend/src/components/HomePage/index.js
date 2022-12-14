import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { actionClearAllSpots, getAllSpots } from '../../store/allSpots'
import './HomePage.css'



function HomePage() {
    const allSpots = useSelector(state => state.allSpots)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actionClearAllSpots())
        dispatch(getAllSpots())
    }, [dispatch])


    return (
        <>
            <div className='spots'>
                {Object.values(allSpots).map(spot => (
                    <div key={spot.id} className='spot-card'>
                        <Link to={`/spots/${spot.id}`}>
                            <div key={spot.id} className='container'>
                                <div className='wrapper'>
                                    <img src={spot.previewImage} alt={spot.name}></img>
                                </div>
                                <div>
                                    <div id='location-stars'>
                                        <span>{spot.city}, {spot.state}</span>
                                        <span><i className="fa-solid fa-star"></i> {Math.round(spot.avgRating * 100) / 100 || 'No Ratings'}</span>
                                    </div>
                                    <br></br>
                                    <div id='price-nightly'>
                                        <div id='price'>${spot.price}</div><div>nightly</div>
                                    </div>
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

export default HomePage;
