import { csrfFetch } from "./csrf"

const GET_USER_REVIEWS = 'user/Reviews'
const EDIT_REVIEW = 'user/editReview'
const DELETE_REVIEW = 'user/deleteReview'
// const ADD_REVIEW = 'spot/AddReview'



const actionGetUserReviews = (reviews) => {
    return {
        type: GET_USER_REVIEWS,
        payload: reviews
    }
}

const actionEditReview = (review) => {
    return {
        type: EDIT_REVIEW,
        payload: review
    }
}

const actionDeleteReview = (id) => {
    return {
        type: DELETE_REVIEW,
        payload: id
    }
}

// const actionAddReview = (review) => {
//     return {
//         type: GET_REVIEWS,
//         payload: review
//     }
// }

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

export const thunkEditReview = (editedReview, reviewId) => async (dispatch) => {
    const { review, stars } = editedReview
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        body: JSON.stringify({
            review,
            stars
        })
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(actionEditReview(data))
        return response
    }
}

export const thunkDeleteReview = (reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        dispatch(actionDeleteReview(reviewId))
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
        case EDIT_REVIEW:
            newState = { ...state }
            const reviewId = action.payload.id
            newState[reviewId].review = action.payload.review
            newState[reviewId].stars = action.payload.stars
            return newState
        case DELETE_REVIEW:
            newState = { ...state }
            delete newState[action.payload]
            return newState
        default:
            return state
    }
}
