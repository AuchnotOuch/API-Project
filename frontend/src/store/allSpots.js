const GET_ALL_SPOTS = 'spots/getSpots'
const CREATE_SPOT = 'spots/createSpot'

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

export const getAllSpots = () => async (dispatch) => {
    const response = await fetch('/api/spots', {
        method: 'GET'
    })
    const data = await response.json()
    dispatch(actionGetAllSpots(data))
    return response
}

export const thunkCreateSpot = (spot) => async (dispatch) => {
    const { address, city, state, country, lat, lng, name, description, price } = spot

    const response = await fetch('/api/spots', {
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
            price
        })
    })
    const data = await response.json()
    dispatch(actionCreateSpot(data))
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
        case CREATE_SPOT:
            newState = { ...state, ...action.payload }
            return newState
        default:
            return state
    }
}
