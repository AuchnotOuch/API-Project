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

                                <img src={spot.previewImage} alt={spot.name}></img>

                                <div>
                                    <div>{spot.city}, {spot.state}</div>
                                    <div>{spot.avgRating}<i className="fa-solid fa-star"></i></div>
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

export default HomePage;
