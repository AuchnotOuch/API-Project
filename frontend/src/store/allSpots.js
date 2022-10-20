import { csrfFetch } from "./csrf"
import { actionClearSingleSpot } from "./singleSpot"

const GET_ALL_SPOTS = 'spots/getSpots'
const GET_USER_SPOTS = 'spots/getUserSpots'
const CREATE_SPOT = 'spots/createSpot'
const DELETE_SPOT = 'spots/deleteSpot'
const CLEAR_STATE = 'spots/clearAllSpots'

export const actionClearAllSpots = () => {
    return {
        type: CLEAR_STATE
    }
}

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

const actionGetUserSpots = (spots) => {
    return {
        type: GET_USER_SPOTS,
        payload: spots
    }
}

export const getAllSpots = () => async (dispatch) => {
    const response = await fetch('/api/spots', {
        method: 'GET'
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(actionGetAllSpots(data))
        dispatch(actionClearSingleSpot())
        return response
    }
}

export const thunkGetUserSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots/current', {
        method: 'GET'
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(actionGetUserSpots(data))
        dispatch(actionClearSingleSpot())
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
            const spotsObj = { ...state }
            action.payload.Spots.forEach(spot => spotsObj[spot.id] = spot)
            newState = Object.assign({ ...state }, { ...spotsObj })
            return newState
        case GET_USER_SPOTS:
            const userSpotsObj = {}
            action.payload.Spots.forEach(spot => userSpotsObj[spot.id] = spot)
            newState = userSpotsObj
            return newState
        case CREATE_SPOT:
            newState = { ...state }
            newState[action.payload.id] = action.payload
            return newState
        case DELETE_SPOT:
            newState = { ...state }
            delete newState[action.payload]
            return newState
        case CLEAR_STATE:
            newState = {}
            return newState
        default:
            return state
    }
}
