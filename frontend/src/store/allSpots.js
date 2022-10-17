import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = 'spots/getSpots'

const actionGetAllSpots = (spots) => {
    return {
        type: GET_ALL_SPOTS,
        payload: spots
    }
}

export const getAllSpots = () => async (dispatch) => {
    const response = await fetch('/api/spots', {
        method: 'GET'
    })
    const data = await response.json()
    dispatch(actionGetAllSpots(data))
    return response
}

function normalizeData(data) {
    const normalizedData = {}
    data.forEach(el => {
        normalizeData[el.id] = el
    })
    return normalizeData
}

export default function spotsReducer(state = {}, action) {
    let newState;
    switch (action.type) {
        case GET_ALL_SPOTS:
            newState = { ...state }
            action.payload.Spots.forEach(spot => newState[spot.id] = spot)
            return newState
        default:
            return state
    }
}
