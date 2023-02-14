import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";


const Results = () => {
    const location = useLocation()
    const results = location.state.results
    console.log(results)


    return (
        <div className="results-container">
            <>
                <div className='spots'>
                    {results.length
                        ? results.map(spot => (
                            <div key={spot.id} className='spot-card'>
                                <Link to={`/spots/${spot.id}`}>
                                    <div key={spot.id} className='container'>
                                        <div className='wrapper'>
                                            <img src={spot.SpotImages['0'].url} alt={spot.name}></img>
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
                        ))
                        : <h2>No Results Found</h2>
                    }
                </div>
            </>
        </div>
    )
}

export default Results
