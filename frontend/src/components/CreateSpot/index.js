import React, { useState } from 'react'
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
                console.log(data)
                if (data && data.errors) {
                    data.errors.forEach(error => {
                        errorsArr.push(error.message)
                    })
                    setErrors(errorsArr)
                }
            })
    };

    return (

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
            <button type='submit'>Create Spot!</button>
            <ul>
                {errors.map(error => <li key={error}>{error}</li>)}
            </ul>
        </form>

    )
}

export default CreateSpot
