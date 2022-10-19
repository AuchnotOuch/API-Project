import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { actionClearSingleSpot, thunkEditSpot } from '../../store/singleSpot'
import { thunkDeleteSpot } from '../../store/allSpots'
import '../CreateSpot/CreateSpot.css'

function EditSpot({ spot }) {
    const spotId = spot.id
    const [address, setAddress] = useState(spot.address)
    const [city, setCity] = useState(spot.city)
    const [state, setState] = useState(spot.state)
    const [country, setCountry] = useState(spot.country)
    const [lat, setLat] = useState(spot.lat)
    const [lng, setLng] = useState(spot.lng)
    const [name, setName] = useState(spot.name)
    const [description, setDescription] = useState(spot.description)
    const [price, setPrice] = useState(spot.price)

    const previewImgUrl = useSelector(state => state.allSpots[spot.id].previewImage)
    const [previewImage, setPreviewImage] = useState(previewImgUrl)


    const dispatch = useDispatch()
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault();

        const spot = {
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price,
            previewImage
        }

        dispatch(thunkEditSpot(spot, spotId))
        history.push(`/`)
    };

    const deleteSpot = () => {
        dispatch(thunkDeleteSpot(spotId))
        dispatch(actionClearSingleSpot())
        history.push('/')
    }

    return (
        <div className='edit-spot-container'>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    placeholder='Spot Name'
                />
                <input
                    type='text'
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    required
                    placeholder='Address'
                />
                <input
                    type='text'
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    required
                    placeholder='City'
                />
                <input
                    type='text'
                    value={state}
                    onChange={e => setState(e.target.value)}
                    required
                    placeholder='State'
                />
                <input
                    type='text'
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                    required
                    placeholder='Country'
                />
                <input
                    type='number'
                    value={lat}
                    onChange={e => setLat(e.target.value)}
                    required
                    placeholder='Latitude'
                />
                <input
                    type='number'
                    value={lng}
                    onChange={e => setLng(e.target.value)}
                    required
                    placeholder='Longitude'
                />
                <input
                    type='text'
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required
                    placeholder='Description'
                />
                <input
                    type='number'
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    required
                    placeholder='Price Per Night'
                />
                <input
                    type='text'
                    value={previewImage}
                    onChange={e => setPreviewImage(e.target.value)}
                    required
                    placeholder='Photo Link'
                />
                <button type='submit'>Save</button>
            </form>
            <button onClick={deleteSpot}>Delete Spot</button>
        </div>

    )
}

export default EditSpot
