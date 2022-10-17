const GET_REVIEWS = 'spot/getReviews'

const actionGetReviews = (reviews) => {
    return {
        type: GET_REVIEWS,
        payload: reviews
    }
}

export const thunkGetReviews = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}/reviews`, {
        method: 'GET'
    })
    const data = await response.json()
    dispatch(actionGetReviews(data))
    return response
}

export default function reviewsReducer(state = {}, action) {
    let newState;
    switch (action.type) {
        case GET_REVIEWS:
            newState = { ...action.payload }
            return newState
        default:
            return state
    }
}
