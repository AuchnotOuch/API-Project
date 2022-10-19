import { csrfFetch } from "./csrf"

const GET_ALL_SPOTS = 'spots/getSpots'
const CREATE_SPOT = 'spots/createSpot'
const DELETE_SPOT = 'spots/deleteSpot'


const actionGetAllSpots = (spots) => {
    return {
        type: GET_ALL_SPOTS,
        payload: spots
    }
}

const actionCreateSpot = (spot) => {
    return {
        type: CREATE_SPOT,
        payload: spot
    }
}

const actionDeleteSpot = (id) => {
    return {
        type: DELETE_SPOT,
        payload: id
    }
}

export const getAllSpots = () => async (dispatch) => {
    const response = await fetch('/api/spots', {
        method: 'GET'
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(actionGetAllSpots(data))
        return response
    }
}

export const thunkCreateSpot = (spot) => async (dispatch) => {
    const { address, city, state, country, lat, lng, name, description, price, previewImage } = spot

    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        body: JSON.stringify({
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
        })
    })
    if (response.ok) {
        const data = await response.json()
        console.log(data.id)
        const imgRes = await csrfFetch(`/api/spots/${data.id}/images`, {
            method: 'POST',
            body: JSON.stringify({
                url: previewImage,
                preview: true
            })
        })
        if (imgRes.ok) {
            dispatch(actionCreateSpot(data))
            dispatch(getAllSpots())
            return response
        }
    }
}

export const thunkDeleteSpot = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        // const data = await response.json()
        dispatch(actionDeleteSpot(spotId))
        return response
    }
}

export default function spotsReducer(state = {}, action) {
    let newState;
    switch (action.type) {
        case GET_ALL_SPOTS:
            console.log('payload -->', action.payload)
            const spotsObj = { ...state }
            console.log('current state copy --->', spotsObj)
            action.payload.Spots.forEach(spot => spotsObj[spot.id] = spot)
            console.log('current state copy after adding spots from payload--->', spotsObj)
            console.log('newState initial --->', newState)
            newState = Object.assign({ ...state }, { ...spotsObj })
            console.log('newState after adding new state --->', newState)
            return newState
        case CREATE_SPOT:
            newState = { ...state }
            newState[action.payload.id] = action.payload
            return newState
        case DELETE_SPOT:
            newState = { ...state }
            delete newState[action.payload]
            return newState
        default:
            return state
    }
}
