import actionTypes from '../actions/actionTypes';


const initialState = {
    genders: [],
    roles: [],
    positions: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            return {
                ...state
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            let copyState = { ...state }
            copyState.genders = action.genderData
            state = { ...copyState }
            console.log(state)
            return {

                ...state
            }
        case actionTypes.FETCH_GENDER_FAIL:
            console.log('actions fail')
            return {
                ...state
            }
        default:
            return state;
    }
}


export default adminReducer;