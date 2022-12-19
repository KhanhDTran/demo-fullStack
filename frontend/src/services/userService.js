import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

const loginApi = (email, password) => {
  return instance.post("/api/login", { email: email, password: password });
};

const getUsersApi = () => {
  return instance.get("/api/users");
};

const createUserApi = (data) => {
  return instance.post("/api/create-user", {
    email: data.email,
    password: data.password,
    address: data.address,
    firstName: data.firstName,
    lastName: data.lastName,
    phoneNumber: data.phoneNumber,
    roleId: data.roleId,
    positionId: data.positionId,
    gender: data.gender,
    image: data.image,
  });
};

const deleteUserApi = (id) => {
  return instance.delete("/api/delete-user", { data: { id: id } });
};

const updateUserApi = (data) => {
  return instance.put("/api/update-user", {
    id: data.id,
    address: data.address,
    firstName: data.firstName,
    lastName: data.lastName,
    phoneNumber: data.phoneNumber,
    roleId: data.roleId,
    positionId: data.positionId,
    gender: data.gender,
    image: data.image,
  });
};

const getAllCodeApi = (inputType) => {
  return instance.get(`/api/allcodes?type=${inputType}`);
};

const getAllDoctorApi = () => {
  return instance.get("/api/get-all-doctors");
};

const getTopDoctorHome = (limit) => {
  return instance.get(`/api/top-doctor-home?limit=${limit}`);
};

const createDoctorInfo = (data) => {
  return instance.post("/api/create-doctor-info", { data });
};

const getDoctorDetailInfo = (id) => {
  return instance.get(`/api/get-doctor-detail-by-id?id=${id}`);
};

const saveScheduleDoctor = (data) => {
  return instance.post("/api/create-schedule", data);
};

const getScheduleByDate = (doctorId, date) => {
  return instance.get(
    `/api/get-schedule-by-date?doctorId=${doctorId}&date=${date}`
  );
};

const getExtraInfoById = (doctorId) => {
  return instance.get(`/api/get-extra-info-by-id?id=${doctorId}`);
};

const getProfileDoctorById = (doctorId) => {
  return instance.get(`/api/get-profile-doctor?id=${doctorId}`);
};

const postPatientBookAppointment = (data) => {
  return instance.post(`/api/patient-book-appointment`, { data: data });
};

export {
  getExtraInfoById,
  loginApi,
  getUsersApi,
  createUserApi,
  deleteUserApi,
  updateUserApi,
  getAllCodeApi,
  getTopDoctorHome,
  getAllDoctorApi,
  createDoctorInfo,
  getDoctorDetailInfo,
  saveScheduleDoctor,
  getScheduleByDate,
  getProfileDoctorById,
  postPatientBookAppointment,
};
