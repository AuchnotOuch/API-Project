const GET_SPOT = 'spots/getSpot'

const actionGetSpot = (spot) => {
    return {
        type: GET_SPOT,
        payload: spot
    }
}

export const getSpot = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}`, {
        method: 'GET'
    })
    const data = await response.json()
    dispatch(actionGetSpot(data))
    return response
}

export default function singleSpotReducer(state = {}, action) {
    let newState;
    switch (action.type) {
        case GET_SPOT:
            newState = { ...action.payload }
            return newState
        default:
            return state
    }
}
