import actionTypes from './actionTypes';
import { getAllCodeApi, createUserApi, getUsersApi, deleteUserApi, updateUserApi } from '../../services/userService';
import { toast } from "react-toastify"


//Create user
export const createNewUser = (data) => {
    return async (dispatch, getState,) => {
        try {
            let res = await createUserApi(data)
            if (res && res.data.errCode == 0) {
                dispatch(saveUserSuccess())

                dispatch(fetchAllUser())
            } else {
                dispatch(saveUserFail())
            }

        } catch (e) {
            console.log(e)
            dispatch(saveUserFail())
        }
    }

}
export const saveUserSuccess = () => (toast.success("Create user success"), {
    type: actionTypes.SAVE_USER_SUCCESS,
})
export const saveUserFail = () => (toast.error("Create user fail"),
{
    type: actionTypes.SAVE_USER_FAIL
})

//Delete user
export const deleteUser = (id) => {
    return async (dispatch, getState,) => {
        try {
            let res = await deleteUserApi(id)
            if (res && res.data.errCode == 0) {
                dispatch(deleteUserSuccess())
                dispatch(fetchAllUser())
            } else {
                dispatch(deleteUserFail())
            }

        } catch (e) {
            dispatch(deleteUserFail())
        }
    }

}
export const deleteUserSuccess = () => (toast.success("Delete user success"), {
    type: actionTypes.DELETE_USER_SUCCESS

})
export const deleteUserFail = () => (toast.error("Delete user fail"), {
    type: actionTypes.DELETE_USER_FAIL
})


//Gender
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

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    genderData: genderData
})
export const fetchGenderFail = () => ({
    type: actionTypes.FETCH_GENDER_FAIL
})

// Position
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

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    positionData: positionData
})
export const fetchPositionFail = () => ({
    type: actionTypes.FETCH_POSITION_FAIL
})


//Role
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


export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    roleData: roleData
})
export const fetchRoleFail = () => ({
    type: actionTypes.FETCH_ROLE_FAIL
})

//Get Users
export const fetchAllUser = () => {
    return async (dispatch, getState,) => {
        try {
            let res = await getUsersApi()
            if (res && res.data.errCode == 0) {
                dispatch(fetchAllUserSuccess(res.data.users.reverse()))

            } else {
                dispatch(fetchAllUserFail())
            }

        } catch (e) {
            dispatch(fetchAllUserFail())
            console.log("fetch gender failed", e)
        }
    }

}

export const fetchAllUserSuccess = (data) => ({
    type: actionTypes.FETCH_USER_SUCCESS,
    users: data

})
export const fetchAllUserFail = () => ({
    type: actionTypes.FETCH_USER_FAIL
})
