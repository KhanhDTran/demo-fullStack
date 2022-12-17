import db from "../models/index";
require("dotenv").config();
import _ from "lodash";
const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;
const getTopDoctorHome = (limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findAll({
        limit: limit,
        where: { roleId: "R2" },
        order: [["createdAt", "DESC"]],
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: db.Allcode,
            as: "positionData",
            attributes: ["valueVi", "valueEn"],
          },
          {
            model: db.Allcode,
            as: "genderData",
            attributes: ["valueVi", "valueEn"],
          },
        ],
        raw: true,
        nest: true,
      });
      resolve({
        errCode: 0,
        data: users,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllDoctor = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let doctors = await db.User.findAll({
        where: { roleId: "R2" },
        attributes: {
          exclude: ["password", "image"],
        },
        raw: true,
        nest: true,
      });
      resolve({
        errCode: 0,
        data: doctors,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const createDoctorInfo = (data) => {
  console.log("data -------------", data);
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.doctorId ||
        !data.contentHTML ||
        !data.contentMarkdown ||
        !data.action
      ) {
        resolve({
          errCode: 1,
          message: "Missing parameter",
        });
      } else {
        if (data.action === "CREATE") {
          await db.Markdown.create({
            contentHTML: data.contentHTML,
            contentMarkdown: data.contentMarkdown,
            description: data.description,
            doctorId: data.doctorId,
          });
        } else if (data.action === "EDIT") {
          let doctorMarkdown = await db.Markdown.findOne({
            where: { doctorId: data.doctorId },
            raw: false,
          });
          if (doctorMarkdown) {
            (doctorMarkdown.contentHTML = data.contentHTML),
              (doctorMarkdown.contentMarkdown = data.contentMarkdown),
              (doctorMarkdown.description = data.description),
              await doctorMarkdown.save();
          }
        }
      }
      resolve({
        errCode: 0,
        message: "Save doctor detail information success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDoctorDetailById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          message: "Missing parameter",
        });
      } else {
        let data = await db.User.findOne({
          where: { id: id },
          attributes: {
            exclude: ["password"],
          },
          include: [
            {
              model: db.Markdown,
              attributes: ["contentHTML", "contentMarkdown", "description"],
            },
            {
              model: db.Allcode,
              as: "positionData",
              attributes: ["valueVi", "valueEn"],
            },
          ],
          raw: true,
          nest: true,
        });
        if (data && data.image) {
          data.image = new Buffer(data.image, "base64").toString("binary");
        }
        if (!data) {
          data = {};
        }
        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const createSchedule = (req) => {
  console.log(req.body);
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !req.body.arrSchedule ||
        !req.body.doctorId ||
        !req.body.date ||
        req.body.date === 0
      ) {
        resolve({
          errCode: "1",
          message: "Missing parameter",
        });
      } else {
        let schedule = req.body.arrSchedule;
        let doctorId = req.body.doctorId;
        let date = req.body.date;
        if (schedule && schedule.length > 0) {
          schedule.map((item) => {
            item.maxNumber = MAX_NUMBER_SCHEDULE;
            return item;
          });
        }
        // Tim trong db co ton tai ko
        let exist = await db.Schedule.findAll({
          where: { doctorId: doctorId, date: date },
          attributes: ["timeType", "date", "doctorId", "maxNumber"],
          raw: true,
        });
        //so sanh khac nhau
        let toCreate = _.differenceWith(schedule, exist, (a, b) => {
          return a.timeType === b.timeType && +a.date === +b.date;
        });
        if (toCreate && toCreate.length > 0) {
          await db.Schedule.bulkCreate(toCreate);
        }
        resolve({
          errCode: 0,
          message: "Create schedule success",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getScheduleByDate = (doctorId, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!doctorId || !date) {
        resolve({
          errCode: 1,
          message: "Missing parameter",
        });
      } else {
        let data = await db.Schedule.findAll({
          where: { doctorId: doctorId, date: date },
          include: [{ model: db.Allcode, as: "timeData" }],
          raw: false,
          nest: true,
        });
        if (!data) data = [];
        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (e) { 
      reject(e);
    }
  });
};

module.exports = {
  getTopDoctorHome,
  getAllDoctor,
  createDoctorInfo,
  getDoctorDetailById,
  createSchedule,
  getScheduleByDate,
};
