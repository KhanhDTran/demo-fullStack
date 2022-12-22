import express from "express";
import userApi from "../api/userApi";
import loginApi from "../api/loginApi";
import doctorApi from "../api/doctorApi";
import patientApi from "../api/patientApi";

require("dotenv").config();

let router = express.Router();

let initWebRoute = (app) => {
  router.get("/", (req, res) => {
    return res.render("home.ejs");
  });

  router.get("/api/users", userApi.getUser);
  router.post("/api/create-user", userApi.createUser);
  router.put("/api/update-user", userApi.updateUser);
  router.delete("/api/delete-user", userApi.deleteUser);

  router.post("/api/login", loginApi.handleLogin);

  router.get("/api/allcodes", userApi.getAllCode);

  // doctor
  router.get("/api/top-doctor-home", doctorApi.getTopDoctorHome);
  router.get("/api/get-all-doctors", doctorApi.getAllDoctor);
  router.post("/api/create-doctor-info", doctorApi.createDoctorInfo);
  router.get("/api/get-doctor-detail-by-id", doctorApi.getDoctorDetailById);
  router.post("/api/create-schedule", doctorApi.createSchedule);
  router.get("/api/get-schedule-by-date", doctorApi.getScheduleByDate);
  router.get("/api/get-extra-info-by-id", doctorApi.getExtraInfoById);
  router.get("/api/get-profile-doctor", doctorApi.getProfileDoctor);

  router.post("/api/patient-book-appointment", patientApi.postBookAppointment);
  router.post("/api/verify-book-appointment", patientApi.postVerifyAppointment);

  return app.use("/", router);
};

module.exports = initWebRoute;
 