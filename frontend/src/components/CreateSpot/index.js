import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { thunkCreateSpot } from '../../store/allSpots'
import './CreateSpot.css'

function CreateSpot() {
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [previewImage, setPreviewImage] = useState('')
    const [errors, setErrors] = useState([])


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
        const errorsArr = []
        dispatch(thunkCreateSpot(spot))
            .then(() => history.push('/'))
            .catch(async (response) => {
                const data = await response.json()
                if (data && data.errors) {
                    data.errors.forEach(error => {
                        errorsArr.push(error.message)
                    })
                    setErrors(errorsArr)
                }
            })
    };

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
                    {errors.map(error => <li id='error' key={error}>{error}</li>)}
                </ul>
                <button id='create-spot-button' type='submit' disabled={!!errors.length}>Create Spot!</button>
            </form>

        </div>

    )
}

export default CreateSpot
