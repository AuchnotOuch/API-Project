import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { thunkEditSpot, thunkGetSpot } from '../../store/singleSpot'
import { getAllSpots, thunkDeleteSpot } from '../../store/allSpots'
import '../CreateSpot/CreateSpot.css'

function EditSpot({ spot }) {
    const spotId = spot.id
    const [address, setAddress] = useState(spot.address)
    const [city, setCity] = useState(spot.city)
    const [state, setState] = useState(spot.state)
    const [country, setCountry] = useState(spot.country)
    const [name, setName] = useState(spot.name)
    const [description, setDescription] = useState(spot.description)
    const [price, setPrice] = useState(spot.price)
    const [errors, setErrors] = useState([])
    // const previewImgUrl = useSelector(state => state.allSpots[spot.id].previewImage)

    const [previewImage, setPreviewImage] = useState(spot.SpotImages[0].url)



    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        const errorArr = []
        if (address.length === 0) {
            errorArr.push("Please provide an address")
        }
        if (city.length === 0) {
            errorArr.push("Please provide a city")
        }
        if (state.length === 0) {
            errorArr.push("Please provide a state")
        }
        if (country.length === 0) {
            errorArr.push("Please provide a country")
        }
        if (name.length === 0) {
            errorArr.push("Please provide a name for the spot")
        }
        if (description.length === 0) {
            errorArr.push("Please provide a description")
        }
        if (price <= 0) {
            errorArr.push("Please provide a valid price")
        }
        if (previewImage.length === 0) {
            errorArr.push("Please provide a spot image")
        }

        setErrors(errorArr)

    }, [previewImage, price, description, name, country, state, city, address])


    const handleSubmit = (e) => {
        e.preventDefault();

        const spot = {
            address,
            city,
            state,
            country,
            name,
            description,
            price,
            previewImage
        }


        dispatch(thunkEditSpot(spot, spotId))
            .then(() => dispatch(getAllSpots()))
            .then(() => dispatch(thunkGetSpot(spotId)))
            .then(() => history.push(`/spots/current`))
            .catch(async (response) => {
                const data = await response.json()
                if (data && data.errors) setErrors(data.errors)

            })
    };

    const deleteSpot = () => {
        dispatch(thunkDeleteSpot(spotId))
        history.push('/spots/current')
    }

    return (
        <div className='form-div'>
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
                <textarea
                    type='text'
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required
                    placeholder='Description'
                />
                <ul>
                    {errors.map((error) => <li id='error' key={error}>{error}</li>)}
                </ul>
                <button id='create-spot-button' type='submit'>Save</button>
                <button id="delete-button-spots" onClick={deleteSpot}><i className="fa-solid fa-trash-can"></i> Delete Spot</button>
            </form>
        </div>

    )
}

export default EditSpot
