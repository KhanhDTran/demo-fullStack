import actionTypes from '../actions/actionTypes';


const initialState = {
    genders: [],
    roles: [],
    positions: [],
    users: [],
    topDoctors: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            return {
                ...state
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.genderData
            return {
                ...state
            }
        case actionTypes.FETCH_GENDER_FAIL:
            state.genders = []
            return {
                ...state
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.positionData
            return {
                ...state
            }
        case actionTypes.FETCH_POSITION_FAIL:
            state.positions = []
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.roleData
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_FAIL:
            state.genders = []
            return {
                ...state
            }
        case actionTypes.FETCH_USER_SUCCESS:
            state.users = action.users
            return {
                ...state
            }
        case actionTypes.FETCH_USER_FAIL:
            state.users = []
            return {
                ...state
            }

        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
            state.topDoctors = action.doctors
            return {
                ...state
            }
        case actionTypes.FETCH_TOP_DOCTOR_FAIL:
            state.topDoctors = []
            return {
                ...state
            }
        default:
            return state;
    }
}


export default adminReducer;