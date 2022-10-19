import { csrfFetch } from "./csrf"

const GET_USER_REVIEWS = 'user/Reviews'

const actionGetUserReviews = (reviews) => {
    return {
        type: GET_USER_REVIEWS,
        payload: reviews
    }
}

export const thunkGetUserReviews = () => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/current`, {
        method: 'GET'
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(actionGetUserReviews(data))
        return response
    }
}

export default function userReviewsReducer(state = {}, action) {
    let newState;
    switch (action.type) {
        case GET_USER_REVIEWS:
            newState = { ...state }
            action.payload.Reviews.forEach(review => newState[review.id] = review)
            return newState
        // case CLEAR_STATE:
        //     newState = {}
        //     return newState
        default:
            return state
    }
}
