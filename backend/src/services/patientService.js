import db from "../models/index";
require("dotenv").config();
import _ from "lodash";
import emailService from "./emailService";
import { v4 as uuidv4 } from "uuid";

const buildUrlEmail = (doctorId, token) => {
  let result = "";

  result = `${process.env.REACT_URL}/verify-booking?token=${token}&doctorId=${doctorId}`;
  return result;
};

const postBookAppointment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.email || !data.date || !data.doctorId || !data.timeType) {
        resolve({ errCode: 1, message: "Missing parameter" });
      } else {
        let token = uuidv4();
        await emailService.sendSimpleEmail({
          receiverEmail: data.email,
          patientName: data.name,
          time: data.timeString,
          doctorName: data.doctorName,
          language: data.language,
          redirectLink: buildUrlEmail(data.doctorId, token),
        });
        // upsert patient
        let [user, created] = await db.User.findOrCreate({
          where: { email: data.email },
          defaults: {
            email: data.email,
            roleId: "R3",
          },
        });
        // create booking
        if (user) {
          await db.Booking.findOrCreate({
            where: { patientId: user.id, doctorId: data.doctorId },
            defaults: {
              statusId: "S1",
              doctorId: data.doctorId,
              patientId: user.id,
              date: data.date,
              timeType: data.timeType,
              token: token,
            },
          });
        }
        resolve({ errCode: 0, message: "Save patient info success" });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const postVerifyAppointment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.token || !data.doctorId) {
        resolve({ errCode: 1, message: "Missing parameter" });
      } else {
        let appointment = await db.Booking.findOne({
          where: {
            doctorId: data.doctorId,
            token: data.token,
            statusId: "S1",
          },
          raw: false,
        });
        if (appointment) {
          appointment.statusId = "S2";
          await appointment.save();
          resolve({ errCode: 0, message: "Update the appointment success" });
        } else {
          resolve({
            errCode: 2,
            message: "Appointment has been actived or does not exist",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  postBookAppointment,
  postVerifyAppointment,
};
