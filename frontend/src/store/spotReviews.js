import { csrfFetch } from "./csrf"

const GET_REVIEWS = 'spot/getReviews'
const ADD_REVIEW = 'spot/AddReview'
const CLEAR_STATE = 'spot/clearReviews'

const actionGetReviews = (reviews) => {
    return {
        type: GET_REVIEWS,
        payload: reviews
    }
}

const actionAddReview = (review) => {
    return {
        type: ADD_REVIEW,
        payload: review
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
    if (response.ok) {
        const data = await response.json()
        dispatch(actionGetReviews(data))
        return response
    }
}

export const thunkAddReview = (addReview, spotId) => async (dispatch) => {
    const { review, stars } = addReview
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        body: JSON.stringify({
            review,
            stars
        })
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(actionAddReview(data))
        return response
    }
}

export default function reviewsReducer(state = {}, action) {
    let newState;
    switch (action.type) {
        case GET_REVIEWS:
            newState = { ...state }
            action.payload.Reviews.forEach(review => newState[review.id] = review)
            return newState
        case ADD_REVIEW:
            newState = { ...state }
            newState[action.payload.id] = action.payload
            return newState
        case CLEAR_STATE:
            newState = {}
            return newState
        default:
            return state
    }
}
