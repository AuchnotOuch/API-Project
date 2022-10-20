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
        type: GET_REVIEWS,
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
    console.log(review)
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
            console.log('get reviews initial newstate--->', newState)
            console.log('get reviews payload --->', action.payload)
            // newState[action.payload.id] = action.payload
            action.payload.Reviews.forEach(review => newState[review.id] = review)
            return newState
        case ADD_REVIEW:
            newState = { ...state }
            console.log('add review payload --->', action.payload)
            newState[action.payload.id] = action.payload
            return newState
        case CLEAR_STATE:
            newState = {}
            return newState
        default:
            return state
    }
}
