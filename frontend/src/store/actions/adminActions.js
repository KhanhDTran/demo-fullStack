import actionTypes from "./actionTypes";
import {
  getAllCodeApi,
  createUserApi,
  getUsersApi,
  deleteUserApi,
  updateUserApi,
  getTopDoctorHome,
  getAllDoctorApi,
  createDoctorInfo,
  getExtraInfoById,
} from "../../services/userService";
import { toast } from "react-toastify";

//get extra info by id
export const fetchExtraInfoById = (doctorId) => {
  return async (dispatch, getState) => {
    try {
      let res = await getExtraInfoById(doctorId);
      if (res && res.data.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_DOCTOR_EXTRA_INFO_SUCCESS,
          data: res.data.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_DOCTOR_EXTRA_INFO_FAIL,
        });
      }
    } catch (e) {
      dispatch({ type: actionTypes.FETCH_DOCTOR_EXTRA_INFO_FAIL });
    }
  };
};

//get doctor infor input
export const fetchDoctorRequiredInfo = () => {
  return async (dispatch, getState) => {
    try {
      let resPrice = await getAllCodeApi("PRICE");
      let resPayment = await getAllCodeApi("PAYMENT");
      let resProvince = await getAllCodeApi("PROVINCE");
      if (
        resPrice &&
        resPrice.data.errCode === 0 &&
        resPayment &&
        resPayment.data.errCode === 0 &&
        resProvince &&
        resProvince.data.errCode === 0
      ) {
        let data = {
          doctorPrice: resPrice.data.data,
          doctorPayment: resPayment.data.data,
          doctorProvince: resProvince.data.data,
        };
        dispatch({
          type: actionTypes.FETCH_DOCTOR_REQUIRED_INFO_SUCCESS,
          data: data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_DOCTOR_REQUIRED_INFO_FAIL,
        });
      }
    } catch (e) {
      dispatch({ type: actionTypes.FETCH_DOCTOR_REQUIRED_INFO_FAIL });
    }
  };
};

// get schedule time
export const fetchAallScheduleTime = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeApi("TIME");
      if (res && res.data.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
          dataTime: res.data.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAIL,
        });
      }
    } catch (e) {
      dispatch({ type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAIL });
    }
  };
};

//Create doctor detail info
export const fetchSaveDoctorInfo = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createDoctorInfo(data);
      console.log(res.data);
      if (res && res.data.errCode === 0) {
        toast.success("Create doctor infor success");
        dispatch(fetchSaveDoctorSuccess(res.data.data));
      } else {
        dispatch(fetchSaveDoctorFail());
        toast.error("Create doctor infor fail:");
      }
    } catch (e) {
      dispatch(fetchSaveDoctorFail());
      toast.error("Create doctor infor fail");
    }
  };
};

export const fetchSaveDoctorSuccess = (data) => ({
  type: actionTypes.SAVE_DOCTOR_INFO_SUCCESS,
});
export const fetchSaveDoctorFail = () => ({
  type: actionTypes.SAVE_DOCTOR_INFO_FAIL,
});

//Create user
export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createUserApi(data);
      if (res && res.data.errCode == 0) {
        dispatch(saveUserSuccess());

        dispatch(fetchAllUser());
      } else {
        dispatch(saveUserFail());
      }
    } catch (e) {
      console.log(e);
      dispatch(saveUserFail());
    }
  };
};
export const saveUserSuccess = () => (
  toast.success("Create user success"),
  {
    type: actionTypes.SAVE_USER_SUCCESS,
  }
);
export const saveUserFail = () => (
  toast.error("Create user fail"),
  {
    type: actionTypes.SAVE_USER_FAIL,
  }
);

//Delete user
export const deleteUser = (id) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserApi(id);
      if (res && res.data.errCode == 0) {
        dispatch(deleteUserSuccess());
        dispatch(fetchAllUser());
      } else {
        dispatch(deleteUserFail());
      }
    } catch (e) {
      dispatch(deleteUserFail());
    }
  };
};
export const deleteUserSuccess = () => (
  toast.success("Delete user success"),
  {
    type: actionTypes.DELETE_USER_SUCCESS,
  }
);
export const deleteUserFail = () => (
  toast.error("Delete user fail"),
  {
    type: actionTypes.DELETE_USER_FAIL,
  }
);

//Edit User
export const editUser = (data) => {
  return async (dispatch, getState) => {
    console.log(data);
    try {
      let res = await updateUserApi(data);
      console.log("res: ", res);
      if (res && res.data.errCode == 0) {
        dispatch(editUserSuccess());
        dispatch(fetchAllUser());
      } else {
        dispatch(editUserFail());
      }
    } catch (e) {
      console.log("e", e);
      dispatch(deleteUserFail());
    }
  };
};
export const editUserSuccess = () => (
  toast.success("Edit user success"),
  {
    type: actionTypes.EDIT_USER_SUCCESS,
  }
);
export const editUserFail = () => (
  toast.error("Edit user fail"),
  {
    type: actionTypes.EDIT_USER_FAIL,
  }
);

//Gender
export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeApi("gender");
      if (res && res.data.errCode == 0) {
        dispatch(fetchGenderSuccess(res.data.data));
      } else {
        dispatch(fetchGenderFail());
      }
    } catch (e) {
      dispatch(fetchGenderFail());
      console.log("fetch gender failed", e);
    }
  };
};
export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  genderData: genderData,
});
export const fetchGenderFail = () => ({
  type: actionTypes.FETCH_GENDER_FAIL,
});

// Position
export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeApi("position");
      if (res && res.data.errCode == 0) {
        dispatch(fetchPositionSuccess(res.data.data));
      } else {
        dispatch(fetchPositionFail());
      }
    } catch (e) {
      dispatch(fetchPositionFail());
      console.log("fetch position failed", e);
    }
  };
};
export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  positionData: positionData,
});
export const fetchPositionFail = () => ({
  type: actionTypes.FETCH_POSITION_FAIL,
});

//Role
export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeApi("role");
      if (res && res.data.errCode == 0) {
        dispatch(fetchRoleSuccess(res.data.data));
      } else {
        dispatch(fetchRoleFail());
      }
    } catch (e) {
      dispatch(fetchRoleFail());
      console.log("fetch position failed", e);
    }
  };
};
export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  roleData: roleData,
});
export const fetchRoleFail = () => ({
  type: actionTypes.FETCH_ROLE_FAIL,
});

//Get Users
export const fetchAllUser = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getUsersApi();
      if (res && res.data.errCode == 0) {
        dispatch(fetchAllUserSuccess(res.data.users.reverse()));
      } else {
        dispatch(fetchAllUserFail());
      }
    } catch (e) {
      dispatch(fetchAllUserFail());
      console.log("fetch gender failed", e);
    }
  };
};

export const fetchAllUserSuccess = (data) => ({
  type: actionTypes.FETCH_USER_SUCCESS,
  users: data,
});
export const fetchAllUserFail = () => ({
  type: actionTypes.FETCH_USER_FAIL,
});

//Get doctors home
export const fetchTopDoctors = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctorHome("12");
      if (res && res.data.errCode === 0) {
        dispatch(fetchTopDoctorsSuccess(res.data.data));
      } else {
        dispatch(fetchTopDoctorsFail());
      }
    } catch (e) {
      console.log("Fetch top doctors home fail: ", e);
      dispatch(fetchTopDoctorsFail());
    }
  };
};
export const fetchTopDoctorsSuccess = (data) => ({
  type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
  doctors: data,
});
export const fetchTopDoctorsFail = () => ({
  type: actionTypes.FETCH_TOP_DOCTOR_FAIL,
});

//Get all doctors
export const fetchAllDoctors = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctorApi();
      if (res && res.data.errCode === 0) {
        dispatch(fetchAllDoctorsSuccess(res.data.data));
      } else {
        dispatch(fetchAllDoctorsFail());
      }
    } catch (e) {
      console.log("Fetch all doctors fail: ", e);
      dispatch(fetchAllDoctorsFail());
    }
  };
};
export const fetchAllDoctorsSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
  doctors: data,
});
export const fetchAllDoctorsFail = () => ({
  type: actionTypes.FETCH_ALL_DOCTOR_FAIL,
});
