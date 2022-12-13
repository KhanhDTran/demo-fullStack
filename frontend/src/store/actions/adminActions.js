import actionTypes from './actionTypes';
import { getAllCodeApi } from '../../services/userService';

export const fetchGenderStart = () => {
    return async (dispatch, getState,) => {
        try {
            let res = await getAllCodeApi('gender')
            if (res && res.data.errCode == 0) {
                dispatch(fetchGenderSuccess(res.data.data))
            } else {
                dispatch(fetchGenderFail())
            }

        } catch (e) {
            dispatch(fetchGenderFail())
            console.log("fetch gender failed", e)
        }
    }

}

export const fetchPositionStart = () => {
    return async (dispatch, getState,) => {
        try {
            let res = await getAllCodeApi('position')
            if (res && res.data.errCode == 0) {
                dispatch(fetchPositionSuccess(res.data.data))
            } else {
                dispatch(fetchPositionFail())
            }

        } catch (e) {
            dispatch(fetchPositionFail())
            console.log("fetch position failed", e)
        }
    }

}
export const fetchRoleStart = () => {
    return async (dispatch, getState,) => {
        try {
            let res = await getAllCodeApi('role')
            if (res && res.data.errCode == 0) {
                dispatch(fetchRoleSuccess(res.data.data))
            } else {
                dispatch(fetchRoleFail())
            }

        } catch (e) {
            dispatch(fetchRoleFail())
            console.log("fetch position failed", e)
        }
    }

}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    genderData: genderData
})
export const fetchGenderFail = () => ({
    type: actionTypes.FETCH_GENDER_FAIL
})


export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    positionData: positionData
})
export const fetchPositionFail = () => ({
    type: actionTypes.FETCH_POSITION_FAIL
})

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    roleData: roleData
})
export const fetchRoleFail = () => ({
    type: actionTypes.FETCH_ROLE_FAIL
})

