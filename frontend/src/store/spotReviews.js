const GET_REVIEWS = 'spot/getReviews'
const GET_USER_REVIEWS = 'user/Reviews'
const CLEAR_STATE = 'spot/clearReviews'

const actionGetReviews = (reviews) => {
    return {
        type: GET_REVIEWS,
        payload: reviews
    }
}

const actionGetUserReviews = (reviews) => {
    return {
        type: GET_USER_REVIEWS,
        payload: reviews
    }
}

export const actionClearReviews = () => {
    return {
        type: CLEAR_STATE
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

export const thunkGetUserReviews = () => async (dispatch) => {
    const response = await fetch(`/api/current`, {
        method: 'GET'
    })
    const data = await response.json()
    dispatch(actionGetUserReviews(data))
    return response
}

export default function reviewsReducer(state = {}, action) {
    let newState;
    switch (action.type) {
        case GET_REVIEWS:
            newState = { ...state }
            action.payload.Reviews.forEach(review => newState[review.id] = review)
            return newState
        case CLEAR_STATE:
            newState = {}
            return newState
        default:
            return state
    }
}
