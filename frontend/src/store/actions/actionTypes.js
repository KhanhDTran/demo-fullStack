const actionTypes = Object.freeze({
  //app
  APP_START_UP_COMPLETE: "APP_START_UP_COMPLETE",
  PROCESS_LOGOUT: "PROCESS_LOGOUT",

  CHANGE_LANGUAGE: "CHANGE_LANGUAGE",

  //admin
  FETCH_GENDER_START: "FETCH_GENDER_START",
  FETCH_GENDER_SUCCESS: "FETCH_GENDER_SUCCESS",
  FETCH_GENDER_FAIL: "FETCH_GENDER_FAIL",

  FETCH_POSITION_SUCCESS: "FETCH_POSITION_SUCCESS",
  FETCH_POSITION_FAIL: "FETCH_POSITION_FAIL",

  FETCH_ROLE_SUCCESS: "FETCH_ROLE_SUCCESS",
  FETCH_ROLE_FAIL: "FETCH_ROLE_FAIL",
  //user
  ADD_USER_SUCCESS: "ADD_USER_SUCCESS",
  USER_LOGIN_SUCCESS: "USER_LOGIN_SUCCESS",
  USER_LOGIN_FAIL: "USER_LOGIN_FAIL",

  EDIT_USER_SUCCESS: "EDIT_USER_SUCCESS",
  EDIT_USER_FAIL: "EDIT_USER_FAIL",

  SAVE_USER_SUCCESS: "SAVE_USER_SUCCESS",
  SAVE_USER_FAIL: "SAVE_USER_FAIL",
  SAVE_DOCTOR_INFO_SUCCESS: "SAVE_DOCTOR_INFO_SUCCESS",
  SAVE_DOCTOR_INFO_FAIL: "SAVE_DOCTOR_INFO_FAIL",

  DELETE_USER_SUCCESS: "DELETE_USER_SUCCESS",
  DELETE_USER_FAIL: "DELETE_USER_FAIL",

  FETCH_USER_FAIL: "FETCH_USER_FAIL",
  FETCH_USER_SUCCESS: "FETCH_USER_SUCCESS",

  FETCH_TOP_DOCTOR_SUCCESS: "FETCH_TOP_DOCTOR_SUCCESS",
  FETCH_TOP_DOCTOR_FAIL: "FETCH_TOP_DOCTOR_FAIL",

  FETCH_ALL_DOCTOR_SUCCESS: " FETCH_ALL_DOCTOR_SUCCESS",
  FETCH_ALL_DOCTOR_FAIL: "FETCH_ALL_DOCTOR_FAIL",

  FETCH_DOCTOR_PRICE_SUCCESS: " FETCH_DOCTOR_PRICE_SUCCESS",
  FETCH_DOCTOR_PRICE_FAIL: "FETCH_DOCTOR_PRICE_FAIL",

  FETCH_DOCTOR_EXTRA_INFO_SUCCESS: " FETCH_DOCTOR_EXTRA_INFO_SUCCESS",
  FETCH_DOCTOR_EXTRA_INFO_FAIL: "FETCH_DOCTOR_EXTRA_INFO_FAIL",

  FETCH_DOCTOR_REQUIRED_INFO_SUCCESS: " FETCH_DOCTOR_REQUIRED_INFO_FAIL",
  FETCH_DOCTOR_REQUIRED_INFO_FAIL: "FETCH_DOCTOR_REQUIRED_INFO_FAIL",

  FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS: " FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS",
  FETCH_ALLCODE_SCHEDULE_TIME_FAIL: "FETCH_ALLCODE_SCHEDULE_TIME_FAIL",
});

export default actionTypes;
