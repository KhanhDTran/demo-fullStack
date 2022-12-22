import db from "../models/index";
require("dotenv").config();
import _ from "lodash";
import emailService from "./emailService";

const postBookAppointment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.email || !data.date || !data.doctorId || !data.timeType) {
        resolve({ errCode: 1, message: "Missing parameter" });
      } else {
        await emailService.sendSimpleEmail({
          receiverEmail: data.email,
          patientName: data.name,
          time: data.timeString,
          doctorName: data.doctorName,
          language: data.language,
          redirectLink:
            "https://www.facebook.com/profile.php?id=100007606840118",
        });
        // upsert patient
        let [user, created] = await db.User.findOrCreate({
          where: { email: data.email },
          defaults: {
            email: data.email,
            roleId: "R3",
          },
        });
        console.log(user, created);
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

module.exports = {
  postBookAppointment,
};
