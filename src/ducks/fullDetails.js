// Action
const FULLDETAILS_FETCH_START = 'ducks/fullDetais/FULLDETAILS_FETCH_START';
const FULLDETAILS_FETCH_SUCCESS = 'ducks/fullDetais/FULLDETAILS_FETCH_SUCCESS';
const FULLDETAILS_FETCH_FAIL = 'ducks/fullDetais/FULLDETAILS_FETCH_FAIL';
// Reducer
export default function reducer(state = { loading: false, tokens: null, error: null }, action = {}) {
    switch (action.type) {
        case FULLDETAILS_FETCH_START:
            return {
                ...state,
                loading: true
            };
        case FULLDETAILS_FETCH_SUCCESS:
            return {
                ...state,
                loading: false
            };
        case FULLDETAILS_FETCH_FAIL:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
}
// Action Creators
export function fullDetailsFetchStart() {
    return { type: FULLDETAILS_FETCH_START };
}
export function fullDetailsFetchSuccess() {
    return { type: FULLDETAILS_FETCH_SUCCESS };
}
export function fullDetailsFetchfetchFail() {
    return { type: FULLDETAILS_FETCH_FAIL };
}
export function fullDetails() {
    return dispatch => {
        dispatch(fullDetailsFetchStart());
        dispatch(fullDetailsFetchSuccess());
        dispatch(fullDetailsFetchFail());
    };
}