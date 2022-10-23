import { csrfFetch } from "./csrf"

const GET_SPOT = 'spots/getSpot'
const EDIT_SPOT = 'spots/editSpot'
const CLEAR_STATE = 'spots/clearSpot'

const actionGetSpot = (spot) => {
    return {
        type: GET_SPOT,
        payload: spot
    }
}

const actionEditSpot = (spot) => {
    return {
        type: EDIT_SPOT,
        payload: spot
    }
}

export const actionClearSingleSpot = () => {
    return {
        type: CLEAR_STATE
    }
}

export const thunkGetSpot = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}`, {
        method: 'GET'
    })

    if (response.ok) {
        const data = await response.json()
        console.log(data)
        dispatch(actionGetSpot(data))
        return response
    }
}

export const thunkEditSpot = (spot, spotId) => async (dispatch) => {
    const { address, city, state, country, name, description, price, previewImage } = spot
    const latitude = (Math.random() * (180 - (-180)) + -180).toFixed(3) * 1
    const longitude = (Math.random() * (180 - (-180)) + -180).toFixed(3) * 1
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        body: JSON.stringify({
            address,
            city,
            state,
            country,
            lat: latitude,
            lng: longitude,
            name,
            description,
            price,
            previewImage
        })
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(actionEditSpot(data))
        return response
    }
}

export default function singleSpotReducer(state = {}, action) {
    let newState;
    switch (action.type) {
        case GET_SPOT:
            newState = { ...action.payload }
            return newState
        case EDIT_SPOT:
            newState = { ...action.payload }
            return newState
        case CLEAR_STATE:
            newState = {}
            return newState
        default:
            return state
    }
}
