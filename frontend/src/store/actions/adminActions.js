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
            console.log("fetch failed", e)
        }
    }

}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    genderData: genderData
})
export const fetchGenderFail = (genderData) => ({
    type: actionTypes.FETCH_GENDER_FAIL
})