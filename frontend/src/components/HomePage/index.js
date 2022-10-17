import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getAllSpots } from '../../store/allSpots'
import './HomePage.css'



function HomePage() {
    const allSpots = useSelector(state => state.allSpots)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])

    return (
        <div>
            {Object.values(allSpots).map(spot => (
                <div className='container'>
                    <div className='spot'>
                        <img src={spot.previewImage} alt={spot.className}></img>
                    </div>
                    <div>{spot.city}, {spot.state}</div>
                    <div>${spot.price}</div>
                    <div>
                        <Link to={`/spots/${spot.id}`}>Details...</Link>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default HomePage;
