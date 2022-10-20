import { csrfFetch } from "./csrf"

const GET_USER_REVIEWS = 'user/Reviews'
const EDIT_REVIEW = 'user/editReview'

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
        console.log('test')
        dispatch(actionEditReview(data))
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
            console.log('state -->', state)
            newState = { ...state }
            console.log('payload', action.payload)
            // console.log(action.payload.review)
            console.log('initial new state --->', newState)
            const reviewId = action.payload.id
            console.log(newState[reviewId].review)
            newState[reviewId].review = action.payload.review
            newState[reviewId].stars = action.payload.stars
            console.log('updated new state --->', newState)
            return newState
        default:
            return state
    }
}
